import styles from './Crypto.module.scss';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { Table } from '@radix-ui/themes';

const BTC_SYM = "BTC-USD";
const ETH_SYM = "ETH-USD";

function Crypto() {
    const [btc, setBTC] = useState([]);
    const [eth, setETH] = useState([]);
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${import.meta.env.VITE_API_BASE}/crypto`, {
        onClose: () => console.log('closed'),
        onError: (e) => console.error(e),
    });

    const updateState = (msg) => (prev) => {
        const newState = [...prev];
        if(newState.length === 20) {
            newState.pop();
        }
        newState.unshift(msg);
        return newState;
    }

    useEffect(() => {
        if(lastJsonMessage !== null) {
            if(lastJsonMessage?.length > 0) {
                for(let i = 0; i < lastJsonMessage.length; i++) {
                    const msg = lastJsonMessage[i];
                    if(msg?.pair === BTC_SYM) {
                        setBTC(updateState(msg));
                    } else if(msg?.pair === ETH_SYM) {
                        setETH(updateState(msg));
                    }
                }
            }
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if(readyState === ReadyState.OPEN) {
            sendJsonMessage({
                action: "auth",
                params: import.meta.env.VITE_API_KEY
            });
            sendJsonMessage({
                action: "subscribe",
                params: `XAS.${BTC_SYM},XAS.${ETH_SYM}`
            })
        }
    }, [readyState]);
    
    return <div className={styles.container}>
        <div className={styles.tableContainer}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Pair</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Open Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Close Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>High</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Low</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Vol. Weighted Avg Price</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        btc?.map((coin, idx) => {
                            return <Table.Row key={idx}>
                                <Table.RowHeaderCell>{coin.pair}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{coin.o}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{coin.c}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{coin.h}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{coin.l}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{coin.vw}</Table.RowHeaderCell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table.Root>
        </div>
        <div className={styles.tableContainer}>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Pair</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Open Price</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Close Price</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>High</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Low</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Vol. Weighted Avg Price</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    eth?.map((coin, idx) => {
                        return <Table.Row key={idx}>
                            <Table.RowHeaderCell>{coin.pair}</Table.RowHeaderCell>
                            <Table.RowHeaderCell>{coin.o}</Table.RowHeaderCell>
                            <Table.RowHeaderCell>{coin.c}</Table.RowHeaderCell>
                            <Table.RowHeaderCell>{coin.h}</Table.RowHeaderCell>
                            <Table.RowHeaderCell>{coin.l}</Table.RowHeaderCell>
                            <Table.RowHeaderCell>{coin.vw}</Table.RowHeaderCell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table.Root>

        </div>
    </div>
}

export default Crypto;