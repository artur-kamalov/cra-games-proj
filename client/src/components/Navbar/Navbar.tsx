import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { MenuButton } from '../MenuButton'
import { AnimatePresence, motion } from 'framer-motion';
import { useResize } from '../../hooks/useResize';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Admin',
    href: '/admin'
  },
]

interface NavbarProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({isOpen, setIsOpen}: NavbarProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation().pathname
  const isScreenMd = useResize().isScreenMd

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <h1>
          Game<span className="purple">Shop</span>
        </h1>
      </div>
      {isScreenMd
      ? (
        <>
          <AnimatePresence >
            {isOpen && 
              <motion.div
              initial={{ opacity: 0, y: -100, speed: 1 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100  }}
              className='menu'
                children=
                  {
                    <>
                      <div className='nav-logo-mobile'>
                        <h1>
                          Game<span className="purple">Shop</span>
                        </h1>
                      </div>
                      {links.map(link => (
                        <Link 
                          className={(location === link.href  ? 'active' : 'unactive') + " li "} 
                          to={link.href}
                          key={link.label}
                          >
                            {link.label}
                        </Link>
                      ))}
                      {isAuthenticated 
                      ? <Link className={(location === '/logout' ? 'active' : 'unactive') + " li "}  to="/logout">Logout</Link> 
                      : <Link className={(location === '/login' ? 'active' : 'unactive') + " li "}  to="/login">Login</Link>}
                    </>
                  }
              />
            }
          </AnimatePresence>
          <div className="burger-menu-container">
            <MenuButton onClick={() => {setIsOpen(current => !current)}} color='white' isOpen={isOpen} radius={5}/>
          </div>
        </>
      )
      : (
        <div className='menu'>
          {links.map(link => (
            <Link 
              className={(location === link.href  ? 'active' : 'unactive') + " li "} 
              to={link.href}
              key={link.label}
              >
                {link.label}
            </Link>
          ))}
          {isAuthenticated 
          ? <Link className={(location === '/logout' ? 'active' : 'unactive') + " li "}  to="/logout">Logout</Link> 
          : <Link className={(location === '/login' ? 'active' : 'unactive') + " li "}  to="/login">Login</Link>}
        </div>
      )
      }
      
    </div>
  )
}

export default Navbar
