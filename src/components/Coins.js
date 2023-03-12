import React, { useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { useEffect } from 'react';
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponet from './ErrorComponent';
import CoinCard from './CoinCard';
const Coins = () => {

  const [coins,setCoins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);
  
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }

  const btn = new Array(116).fill(1)

    useEffect(() => {  
      const fetchCoins = async()=>{
        try{
          const{data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
          setCoins(data);
          setLoading(false);
        } catch(error){
            setLoading(true);
            setError(true);
        }
        
    };
    fetchCoins();
  }, [currency,page]);

  if(error) 
    return <ErrorComponet message={"Error while Fetching Coins" } />
  
  return (
      <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} padding={'8'}>
          <HStack spacing={"4"}>
            <Radio value={'inr'}>₹ INR</Radio>
            <Radio value={'eur'}>€ EUR</Radio>
            <Radio value={'usd'}>$ USD</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                img={i.image}
                symbol = {i.symbol}
                price = {i.current_price}
                currencySymbol={currencySymbol}

              />
            ))}
          </HStack>

          <HStack w={'full'} overflow={'auto'} padding={'8'}>
            {
              btn.map((item, index)=>(
                <Button 
                  bgColor={'blackAlpha.900'} 
                  color={'white'} 
                  onClick={()=>changePage(index+1)}
                  key={index}
                >
                  {index + 1}
                  </Button>
              ))
            }
          </HStack>
        </>
      )}
    </Container>
  );
};


export default Coins