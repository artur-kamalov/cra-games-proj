import { GameType } from '../../../../../types';
import { MouseEventHandler, useState } from "react";
import {SlPlus} from 'react-icons/sl'
import {FaRegCircleCheck} from 'react-icons/fa6'

interface ConfirmButtonProps {
  confirm: boolean,
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>,
  gamePrice: string,
  gameName: string
}

const ConfirmButton = ({confirm, setConfirm, gameName, gamePrice}: ConfirmButtonProps) => {
  
  const buyGameClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    localStorage.setItem(gameName+'purchased', 'true');
    setConfirm(false)
  }
  return (
    <div className="confirm">
      {!confirm 
      ? <button onClick={() => setConfirm(true)} className="game-price">{gamePrice}</button>
      : <div className="confirm-btns">
         <button onClick={buyGameClick} className="confirm-btn">confirm</button>
         <button onClick={() => setConfirm(false)} className="cancel-btn">cancel</button>
        </div>
      }
    </div>
  )
}

interface GameItemProps {
    game: GameType
}

export default function GameItem({game}: GameItemProps) {
  const [confirm, setConfirm] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUpdated, setIsUpdated] = useState(false)

  const updateComponent = () => {
    setIsUpdated(true)
    setTimeout(() => setIsUpdated(false), 0)
  }

  const addGameToWishes: MouseEventHandler<HTMLButtonElement> = (e) => {
    localStorage.setItem(game.name+'InWishes', 'true');
    updateComponent()
  }
  const removeGameFromWishes: MouseEventHandler<HTMLButtonElement> = (e) => {
    localStorage.removeItem(game.name+'InWishes');
    updateComponent()
  }
  return (
      <div className="game-card-container"> 
        <div className="game-card">
          <div className="game-card-img-container">
            <img src={game.mainImage} alt="mainImage" />
          </div>
              
          <h3 className="game-name">{game.name}</h3>

          <div className="game-card-content">
            <div className="price-form">
              {localStorage.getItem(game.name+'purchased')
                ? <div className="is-purchased">
                    in purchases
                  </div>
                : <ConfirmButton gameName={game.name} gamePrice={game.price} confirm={confirm} setConfirm={setConfirm}/>
              }
            </div>

            <div>
              {!localStorage.getItem(game.name+'InWishes') && 
                <>
                  <button onClick={addGameToWishes} className="game-add-to-whish-list">
                    <SlPlus scale={100} size={'100%'}/>
                    <div className="pop-up out-wish">
                      Add to Wishlist
                    </div>
                  </button> 
                </>
              }

              {localStorage.getItem(game.name+'InWishes') && 
                <>
                  <button onClick={removeGameFromWishes} className="game-in-whish-list">
                    <FaRegCircleCheck size={'100%'}/>
                    <div className="pop-up in-wish">
                      Remove from Wishlist
                    </div>
                  </button> 
                </>
              }

            </div>
          </div>
        </div>
      </div>
  );
}