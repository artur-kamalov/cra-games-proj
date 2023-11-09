import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import Modal from "../../../components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { changeGameFields } from "../../../features/games/gamesSlice"

const NameForm = () => {

  const game = useSelector((state: RootState) => state.gameState)
  const dispatch = useDispatch()
  
  const [isSubmited, setIsSubmited] = useState(false)
  const [name, setName] = useState<string>(game.name)

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e, submitted?: boolean) => {
    e.preventDefault()
    try {
      dispatch(changeGameFields({...game, name: name}))
  setIsSubmited(true)        
      setTimeout(() => setIsSubmited(false), 1500)
    } catch (error) {
      console.log(error)
      setIsSubmited(false)        
    }
  }
  
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  }
  
  console.log('render')

  return (
    <div className="form-container">
      <h1 className="form-title">Name form</h1>
      <form  className='form-field'>
        
        <input onChange={handleInputChange} value={name} type="text" className="form-input" placeholder="add name.."/>

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

export default NameForm