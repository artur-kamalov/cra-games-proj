import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const AddGameToList = () => {

  const game = useSelector((state: RootState) => state.gameState)
  const createNewGame = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/games/createNewGame`,
        game,
      );
    } catch (err: any) {
      console.log(err)
    }
  };

  return (
    <button className='submit-btn' onClick={createNewGame}>
        Create game
    </button>
  )
}

export default AddGameToList