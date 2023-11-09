import AddGameForm from "./_components/AddGameForm";
import './Admin.css'

export default function Admin() {
  return (
    <div className="container">
        <div className="admin-panel">
          <AddGameForm/>
        </div>
    </div>
  )
}
