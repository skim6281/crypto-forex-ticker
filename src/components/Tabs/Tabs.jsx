import { useState } from 'react';
import styles from './Tabs.module.scss';
import cx from 'classnames';

function Tabs() {
    const [selectedTab, setSelectedTab] = useState('crypto');

    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                <li 
                    className={cx(styles.tab, {[styles.selectedTab]: selectedTab === 'crypto'})}
                    onClick={() => setSelectedTab('crypto')}
                >Crypto</li>
                <li 
                    className={cx(styles.tab, {[styles.selectedTab]: selectedTab === 'forex'})}
                    onClick={() => setSelectedTab('forex')}
                >Forex</li>
            </ul>
        <div className={styles.content}>
            {selectedTab === 'crypto' && <h1>CRYPTO</h1>}
            {selectedTab === 'forex' && <h1>FOREX</h1>}
        </div>
        </div>
    )
}

export default Tabs;