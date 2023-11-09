import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { RootState } from "../../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { changeGameFields } from "../../../features/games/gamesSlice"
import Modal from "../../../components/Modal/Modal"

const PriceForm = () => {

  const game = useSelector((state: RootState) => state.gameState)
  const dispatch = useDispatch()
  
  const [isSubmited, setIsSubmited] = useState(false)
  const [price, setPrice] = useState<string>(game.price)

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e, submitted?: boolean) => {
    e.preventDefault()
    try {
      dispatch(changeGameFields({...game, price: price}))
  setIsSubmited(true)        
      setTimeout(() => setIsSubmited(false), 1500)
    } catch (error) {
      console.log(error)
      setIsSubmited(false)        
    }
  }
  
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPrice(e.target.value);
  }
  
  return (
    <div className="form-container">
      <h1 className="form-title">Price form</h1>
      <form  className='form-field'>
        
        <input onChange={handleInputChange} value={price} type="text" className="form-input" placeholder="add price.."/>

        <button className='submit-btn' onClick={onSubmit} >
          Submit
        </button>
      </form>

      <Modal 
        active={isSubmited} setActive={setIsSubmited} 
        containerClasses='notification-succes--container '
        contentClasses='notification-succes--content '
        closeOnClick={false}
      >
        <>Succesfull submit</>
      </Modal>
    </div>
  )
}
export default PriceForm