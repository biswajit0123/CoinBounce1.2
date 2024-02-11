import { useState,useEffect } from "react";
import { getCrypto } from "../../api/external";
import styles from "./Crypto.module.css";
import Loader1 from '../../Components/Loader/Loader1'

 function Crypto( ){
const [Data, setData] = useState([]);

useEffect(() =>{
  (async function apiCall(){
    const respons = await  getCrypto();
    setData(respons);
  })();

   setData([]);
},[]);

const negativeStyle = {
  color: "#ea3943",
};

const positiveStyle = {
  color: "#16c784",
};

return(
<>
<table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((coin) => (
          <tr id={coin.id} className={styles.tableRow}>
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className={styles.logo}>
                <img src={coin.image} width={40} height={40} /> {coin.name}
              </div>
            </td>
            <td>
              <div className={styles.symbol}>{coin.symbol}</div>
            </td>
            <td>{coin.current_price}</td>
            <td
             style={
              coin.price_change_percentage_24h < 0
                ? negativeStyle
                : positiveStyle
            }
            >
              {coin.price_change_percentage_24h}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
</>
);

}

export default Crypto;