import React,{useState, useEffect} from 'react';
import styles from './detail.module.css';
import Card from '../card/Card';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import numeral from 'numeral';
import CountUp from 'react-countup';
import Stats from '../stats/Stats';
import {AiFillInfoCircle} from 'react-icons/ai';

const Detail = ({data}) => {
  // console.log(data.allTimeHigh)
  return (
    <main className={styles.mainContainer}>
      <section className={styles.statscontainer}>
      <section className={styles.section}>
        <div className={styles.logoWrapper}>
        <img className={styles.logo} src={data.iconUrl}/>
          <div className={styles.basic_info}>
            <span className={styles.name}>{data.name}
              <span className={styles.rank} style={{color:`${data.color}`}}>#{data.rank}</span>
            </span>
            <div className={styles.datecontainer}>
            <h3 className={styles.price}>$ <CountUp end={data.price} separator=',' decimals={3} duration={2}/>
            </h3>
            </div>
            <span className={styles.change}> <span>change:</span> {data.change}%
            </span>
          </div>
        </div>
      </section>
      <section className={styles.stats}>
      </section>
      </section>
    <div className={styles.cardContainer}> 
      <div className={styles.sparkline}>
        <p className={styles.p}>Fluctuation Line</p>
        <Sparklines data={data.sparkline} margin={6}>
    <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
    <SparklinesSpots size={4}
        style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
    </Sparklines>
      </div>
      <Card title='24h Volume' content={data["24hVolume"]}/>
      <Card title='Market Capital' content={data.marketCap}/>
      <div className={styles.supply}>
        <p>Markets</p>
        <div className={styles.content}><CountUp end={data.numberOfMarkets} separator=',' duration={2}/></div>
      </div>
    </div>
    </main>
  );
};

export default Detail;
