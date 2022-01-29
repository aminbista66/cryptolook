import React,{useState} from 'react';
import styles from './card.module.css';
import numeral from 'numeral';
import CountUp from 'react-countup';
const Card = (props) => {
    const {content} = props;
    // console.log(converter())
  return(
      <main className={styles.container}>
        <p className={styles.p}>{props.title}</p>
        <div className={styles.content}><span>$</span><CountUp end={content} separator=',' decimal={2} duration={2}/></div>
      </main>
  );
};

export default Card;
