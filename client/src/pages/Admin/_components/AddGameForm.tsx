import AddGameToList from "./AddGameToList"
import CategoryForm from "./CategoryForm"
import ImageForm from "./ImageForm"
import NameForm from "./NameForm"
import PriceForm from "./PriceForm"

// const gameFormInitState: GameType = {
//   category: '',
//   images: [],
//   inWishList: false,
//   name: '',
//   price: '',
//   purchased: false,
// }

const AddGameForm = () => {

  return (
    <div className="add-game-forms">
        <NameForm/>
        <CategoryForm/>
        <ImageForm/>
        <PriceForm/>
        <AddGameToList/>
        {/* <Publish/> */}

    </div>
  )
}

export default AddGameForm