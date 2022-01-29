import React,{useState, useEffect} from 'react';
import axios from 'axios';
import styles from './stats.module.css'
import CountUp from 'react-countup';

const Stats = () => {
    const [stats, setStats] = useState({});

    useEffect(()=>{
        const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/stats',
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '5976a69849mshafc1ddc93629852p1daaaajsnf6ff5d9507d7'
        }
        };

        axios.request(options).then(function (response) {
            setStats(response.data.data);
        }).catch(function (error) {
            console.error(error);
        });
    },[])

  return(
      <main className={styles.container}>
          <div className={styles.content}>
            <span>Total Coins: </span>  {stats.totalCoins}
            <hr />
            <span>Total Coins: </span>  {stats.totalCoins}
            <hr />
            <span>Total Coins: </span>  {stats.totalCoins}
            <hr />
          </div>
      </main>
  );
};

export default Stats;
