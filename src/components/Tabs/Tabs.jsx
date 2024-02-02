import { useState } from 'react';
import styles from './Tabs.module.scss';
import cx from 'classnames';
import Crypto from '../Crypto';
import Forex from '../Forex';

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
            {selectedTab === 'crypto' && <Crypto/>}
            {selectedTab === 'forex' && <Forex />}
        </div>
        </div>
    )
}

export default Tabs;