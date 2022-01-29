import {useContext, createContext, useState, useEffect} from 'react';
import axios from 'axios';
const AppContext = createContext('');

function AppProvider({children}) {
    const [selected, setSelected] = useState('');
    const [coinsData, setCoinsData] = useState({});
    const [isPos, setIsPos] = useState();
    console.log(coinsData)
    useEffect(()=>{
        const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${selected}`,
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '5976a69849mshafc1ddc93629852p1daaaajsnf6ff5d9507d7'
        }
        };

        axios.request(options).then(function (response) {
            setCoinsData(response.data.data.coin);
        }).catch(function (error) {
            console.error(error);
        }); 
    },[selected])

    return (
        <AppContext.Provider value={{selected, setSelected, coinsData, isPos}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export { AppProvider };

