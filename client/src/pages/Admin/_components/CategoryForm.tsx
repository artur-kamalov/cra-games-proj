import { categories, categoryType, } from '../../../consts/categories';
import Combobox from '../../../components/Combobox/Combobox';
import { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { changeGameFields } from '../../../features/games/gamesSlice';
import Modal from '../../../components/Modal/Modal';

const CategoryForm = () => {
  
  const game = useSelector((state: RootState) => state.gameState)
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState<categoryType>(game.category)
  const [isSubmited, setIsSubmited] = useState(false)
  
    const onSubmit: MouseEventHandler<HTMLButtonElement> = (e, submitted?: boolean) => {
      e.preventDefault()
      try {
        dispatch(changeGameFields({...game, category: selectedOption}))
        setIsSubmited(true)        
        setTimeout(() => setIsSubmited(false), 1500)
      } catch (error) {
        console.log(error)
        setIsSubmited(false)        
      }
    }
    
    return (
      <div className="form-container">
        <h1 className="form-title">Category form</h1>
        <form className='form-field'>
          
          <Combobox 
            selectedOption={selectedOption} 
            setSelectedOption={setSelectedOption} 
            placeholder='choose category..' 
            labels={categories}
          />

          <button className='submit-btn' disabled={isSubmited}  onClick={onSubmit} >
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

export default CategoryForm