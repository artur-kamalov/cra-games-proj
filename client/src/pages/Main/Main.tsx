import { GameType } from '../../types'
import GamesForm from './_components/GamesForm/GamesForm'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPageImg from './_components/MainPageImg';
import './Main.css'

export default function Main() {
  
  const [data, setData] = useState<GameType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/games/getall`
        );
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.log(error)
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
  return (
    
    <>
      <MainPageImg/>
      <GamesForm games={data} />
    </>
  )
}