import styles from './Crypto.module.scss';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { useEffect, useState } from 'react';

const BTC_SYM = "BTC-USD";
const ETH_SYM = "ETH-USD";

function Crypto() {
    const [btc, setBTC] = useState([]);
    const [eth, setETH] = useState([]);
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${import.meta.env.VITE_API_BASE}/crypto`, {
        onClose: () => console.log('closed'),
        onError: (e) => console.error(e),
    });

    useEffect(() => {
        if(lastJsonMessage !== null) {
            // console.log(lastJsonMessage);
            if(lastJsonMessage?.length > 0) {
                for(let i = 0; i < lastJsonMessage.length; i++) {
                    const msg = lastJsonMessage[i];
                    if(msg?.pair === BTC_SYM) {
                        setBTC((prev) => {
                                if(prev.length === 20) {
                                prev.shift();
                            }
                            return prev.concat(msg);
                        })
                    } else if(msg?.pair === ETH_SYM) {
                        setETH((prev) => {
                                if(prev.length === 20) {
                                prev.shift();
                            }
                            return prev.concat(msg);
                        })
                    }
                }
            }
        
        }
    }, [lastJsonMessage])

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

    console.log('btc', btc);
    console.log('eth', eth);
    
    return <div>
        CRYPTO
    </div>
}

export default Crypto;