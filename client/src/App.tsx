import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import useRoutes from './routes/routes';

const App = () => {
  const routes = useRoutes()
  const [navIsOpen, setnavIsOpen] = useState(false)

  return (
    <div className='app'>
      <Navbar isOpen={navIsOpen} setIsOpen={setnavIsOpen}/>
      {routes}
    </div>
  )
};

export default App;
