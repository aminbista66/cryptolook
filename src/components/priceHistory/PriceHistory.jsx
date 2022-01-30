import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import ReactApexChart from 'react-apexcharts';
import styles from './pricehistpry.module.css'
const PriceHistory = () => {
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [period, setPeriod] = useState('3h');
    const {selected, coinsData} = useGlobalContext();
    const series = [{
        name: 'series1',
        data: priceData
    }]
    const options = {
        chart: {
        height: 350,
        type: 'area'
        },
        colors:[coinsData.color],
        dataLabels: {
        enabled: false
        },
        stroke: {
        curve: 'smooth'
        },
        xaxis: {
        type: 'datetime',
        categories: timeData
        },
        tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
        },
    }

    function handlePriceChartData(array_object_data){
        let price_data_array = [];
        array_object_data.map(single_object => (price_data_array.push(Math.round(single_object.price))))
        return price_data_array;
    }
    function handleTimeChartData(array_object_data){
        let time_data_array = [];
        array_object_data.map(single_object =>{
            // let date_string = new Date(single_object.timestamp * 1000)
            // time_data_array.push(date_string.toDateString())
            var a = new Date(single_object.timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            time_data_array.push(time)
        })
        return time_data_array;
    }
    function handleChange(e){
        setPeriod(e.target.value)
    }
    useEffect(()=>{
        const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${selected}/history`,
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: `${period}`},
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '5976a69849mshafc1ddc93629852p1daaaajsnf6ff5d9507d7'
        }
        };

        axios.request(options).then(function (response) {
            setPriceData(handlePriceChartData(response.data.data.history));
            setTimeData(handleTimeChartData(response.data.data.history));
        }).catch(function (error) {
            console.error(error);
        });      
    },[selected, period])


  return(
      <main className={styles.container}>
    <div className={styles.content}>
          <div className={styles.heading}>Price History</div>
          <div className={styles.options}>
      <select name="" id="" onChange={(e) => handleChange(e)}>
          <option value="3h">3h</option>
          <option value="24h">24h</option>
          <option value="7d">7d</option>
          <option value="30d">30d</option>
          <option value="3m">3m</option>
          <option value="1y">1y</option>
          <option value="3y">3y</option>
          <option value="5y">5y</option>
      </select>
          </div>
    </div>
            <div id="chart">
  <ReactApexChart options={options} series={series} type="area" height={350} />
</div>
      </main>
  );
};

export default PriceHistory;
