import { createContext, useContext, useState } from 'react';

const KEY = 'harvest_draft';
const empty = () => ({ entities: {}, ops: [] });

let _counter = 0;
const tempId = () => `_new_${Date.now()}_${++_counter}`;

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || empty(); }
  catch { return empty(); }
}

function persist(d) {
  localStorage.setItem(KEY, JSON.stringify(d));
}

const Ctx = createContext(null);

export function DraftProvider({ children }) {
  const [state, setState] = useState(load);

  function mut(fn) {
    setState(prev => {
      const next = fn(prev);
      persist(next);
      return next;
    });
  }

  // Populate an entity from backend data — only if not already drafted
  function seed(entity, data) {
    mut(prev => {
      if (prev.entities[entity] !== undefined) return prev;
      return { ...prev, entities: { ...prev.entities, [entity]: data } };
    });
  }

  // Add a new item to a list entity
  function add(entity, item, path) {
    const id = tempId();
    mut(prev => ({
      ...prev,
      entities: {
        ...prev.entities,
        [entity]: [...(prev.entities[entity] || []), { ...item, id, _new: true }],
      },
      ops: [...prev.ops, { method: 'POST', path, body: item, _tempId: id }],
    }));
  }

  // Update an existing item — merges body into the item and upserts the PATCH op
  function updateItem(entity, id, body, path) {
    const isNew = String(id).startsWith('_new_');
    mut(prev => {
      const items = (prev.entities[entity] || []).map(item =>
        item.id === id ? { ...item, ...body } : item
      );
      let ops = prev.ops;
      if (isNew) {
        ops = ops.map(op =>
          op._tempId === id ? { ...op, body: { ...op.body, ...body } } : op
        );
      } else {
        const idx = ops.findIndex(op =>
          op.method === 'PATCH' && op._id === id && op._entity === entity
        );
        if (idx >= 0) {
          ops = ops.map((op, i) =>
            i === idx ? { ...op, body: { ...op.body, ...body } } : op
          );
        } else {
          ops = [...ops, { method: 'PATCH', path, body, _id: id, _entity: entity }];
        }
      }
      return { ...prev, entities: { ...prev.entities, [entity]: items }, ops };
    });
  }

  // Remove an item — strips its pending PATCH / removes create op for new items
  function removeItem(entity, id, path) {
    const isNew = String(id).startsWith('_new_');
    mut(prev => {
      const items = (prev.entities[entity] || []).filter(item => item.id !== id);
      let ops = prev.ops;
      if (isNew) {
        ops = ops.filter(op => op._tempId !== id);
      } else {
        ops = ops.filter(op =>
          !(op.method === 'PATCH' && op._id === id && op._entity === entity)
        );
        ops = [...ops, { method: 'DELETE', path, _id: id }];
      }
      return { ...prev, entities: { ...prev.entities, [entity]: items }, ops };
    });
  }

  // Stage a single-object update (e.g. profile) — upserts one PATCH op per path
  function stageObj(entity, body, path) {
    mut(prev => {
      const idx = prev.ops.findIndex(
        op => op.method === 'PATCH' && op.path === path && !op._entity
      );
      const ops = idx >= 0
        ? prev.ops.map((op, i) => i === idx ? { ...op, body } : op)
        : [...prev.ops, { method: 'PATCH', path, body }];
      return { ...prev, entities: { ...prev.entities, [entity]: body }, ops };
    });
  }

  async function push(authedFn) {
    for (const op of state.ops) {
      await authedFn(op.method, op.path, op.body);
    }
    clear();
  }

  function clear() {
    const e = empty();
    persist(e);
    setState(e);
  }

  return (
    <Ctx.Provider value={{ state, seed, add, updateItem, removeItem, stageObj, push, clear, hasDraft: state.ops.length > 0 }}>
      {children}
    </Ctx.Provider>
  );
}

export const useDraft = () => useContext(Ctx);
