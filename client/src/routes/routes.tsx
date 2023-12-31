import { Route, Routes } from 'react-router-dom';
import {PrivateRoute} from '../components/PrivateRoute';
import Main from '../pages/Main/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin/Admin';
import Logout from '../pages/Logout';
import Auth from '../pages/Auth/Auth';

export const useRoutes = () => {

  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Auth />} />
      <Route path='/admin' element={<Admin />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/logout" element={<Logout />} />
      </Route>

    </Routes>
  )
}

export default useRoutes