import { Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styles from './Forex.module.scss';

const EUR_SYM = 'EUR/USD';
const CHF_SYM = 'CHF/USD';

function Forex() {
    const [eur, setEUR] = useState([]);
    const [chf, setCHF] = useState([]);
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${import.meta.env.VITE_API_BASE}/forex`, {
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
                    if(msg?.pair === EUR_SYM) {
                        setEUR(updateState(msg));
                    } else if(msg?.pair === CHF_SYM) {
                        setCHF(updateState(msg));
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
                params: `CAS.${EUR_SYM},CAS.${CHF_SYM}`
            })
        }
    }, [readyState]);

    return <div className={styles.container}>
       <div className={styles.tableContainer}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Pair</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Open</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Close</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>High</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Low</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        eur?.map((currency, idx) => {
                            return <Table.Row key={idx}>
                                <Table.RowHeaderCell>{currency.pair}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.o}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.c}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.h}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.l}</Table.RowHeaderCell>
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
                        <Table.ColumnHeaderCell>Open</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Close</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>High</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Low</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        chf?.map((currency, idx) => {
                            return <Table.Row key={idx}>
                                <Table.RowHeaderCell>{currency.pair}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.o}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.c}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.h}</Table.RowHeaderCell>
                                <Table.RowHeaderCell>{currency.l}</Table.RowHeaderCell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table.Root>
       </div>
    </div>
}

export default Forex;