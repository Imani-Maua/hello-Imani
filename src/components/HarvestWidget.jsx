import { useState } from 'react';
import styles from './HarvestWidget.module.scss';

function HarvestWidget() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={styles.card}
                onClick={() => setOpen(true)}
                aria-label="Chat with Harvest"
            >
                <span className={styles.dot} />
                <span className={styles.label}>Harvest</span>
            </button>

            {open && (
                <div className={styles.panel} role="dialog" aria-label="Harvest">
                    <div className={styles.panelHeader}>
                        <div className={styles.panelTitle}>
                            <span className={styles.panelDot} />
                            <span>Harvest</span>
                        </div>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >✕</button>
                    </div>
                    <div className={styles.panelBody}>
                        <div className={styles.bubble}>
                            <p>Well, hello there, I am Harvest! 👋</p>
                            <p>I'm Elaine's networking assistant! I know quite a lot about the mind behind this portfolio, and I'm here to help you explore her work, ideas, and the thinking behind them.</p>
                            <p>I'm still putting a few finishing touches but I'll be ready to chat soon.</p>
                            <p>In the mean time, have a look around, there's plenty to discover! 🌱</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HarvestWidget;
