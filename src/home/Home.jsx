import Navbar from "../components/navbar/Navbar";
import PriceHistory from "../components/priceHistory/PriceHistory";
import Detail from "../components/detail/Detail";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useGlobalContext } from "../context";
import styles from './home.module.css';

const Home = () => {
    const [options, setOptions] = useState([]);
    const {setSelected, coinsData, isPos} = useGlobalContext();
    useEffect(()=>{
        const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            tiers: '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
        },
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '5976a69849mshafc1ddc93629852p1daaaajsnf6ff5d9507d7'
        }
        };

        axios.request(options).then(function (response) {
            setOptions(response.data.data.coins);
            setSelected(response.data.data.coins[0].uuid)
        }).catch(function (error) {
            console.error(error);
        });
    },[])

  return(
      <main className={styles.container}>
        <Navbar options={options} />
        <Detail data={coinsData} sign={isPos}/>
        <PriceHistory/>
      </main>
  );
};

export default Home;
