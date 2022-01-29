import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { useGlobalContext } from '../../context';

const Navbar = ({options}) => {
  const {selected, setSelected} = useGlobalContext();
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () =>{
    if(window.pageYOffset === 0){
      setIsScrolled(false)
    } else{
      setIsScrolled(true)
    }
    return () => window.pageYOffset = null;
  }
  console.log(isScrolled)
  function handleChange(e){
      setSelected(e.target.value);
    // console.log(e.target.value)
  }
    return (      
    <div className={isScrolled ? styles.scrolled: styles.container }>
        <span className={styles.title}>Crypto Look</span>
        <div className={styles.coins}>
            <select name="" id="" onChange={e=>handleChange(e)}>
                {options.map( (option, i) => (
                    <option value={option.uuid} key={i}>{option.name}</option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default Navbar;
