/* eslint-disable no-unused-vars */
import './App.css';
import CreateCard from './components/CreateCard';
import Cards from './components/Cards';
import { useEffect, useState } from 'react';

const api = 'http://localhost:3001/api/v1/';
const API_ENDPOINT_PROCESS = 'card-process';
const API_ENDPOINT_CARD_TYPE = 'card-type/';

function App() {
  const [savedCards, setSavedCards] = useState([]);
  const [cardType, setCardType] = useState('');
  const [systemStatus, setSystemStatus] = useState('');

  const getCardType = async (number) => {
    try {
      const card = await fetch(api + API_ENDPOINT_CARD_TYPE + number);
      const res = await card.json();
      if (res.status === 'success') {
        setCardType(res.message);
      } else {
        setCardType('');
      }
    } catch (error) {}
  };

  const getAllCards = async () => {
    try {
      const cards = await fetch(api + API_ENDPOINT_PROCESS);
      setSavedCards(await cards.json());
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setSystemStatus('Offline');
      }
    }
  };

  const setData = async (json) => {
    try {
      const response = await fetch(api + API_ENDPOINT_PROCESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
      setCardType(null);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <>
      <h1>Credit Card System</h1>
      {systemStatus && <h3>System {systemStatus}</h3>}
      <CreateCard
        setData={setData}
        getCardType={getCardType}
        cardType={cardType}
        setCardType={setCardType}
        setSavedCards={setSavedCards}
      />
      <Cards cardsData={savedCards} />
    </>
  );
}

export default App;
