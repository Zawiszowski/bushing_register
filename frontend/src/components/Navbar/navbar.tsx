import {useState} from "react";

import {
    Nav,
    NavigationLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Logo,

    MobileIcon,

}

from './Navbar.styles';
import { FaBars } from 'react-icons/fa';
import { useAuthContext } from "../../context/AuthContext";


const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const {user} = useAuthContext();

  let button


  if (user.email !== ""){
    button = <NavBtnLink to='/login'>Profile</NavBtnLink>
  }else{
    button = <NavBtnLink to='/login'>Login</NavBtnLink>
    
  }
  

    return (
      <>
        <Nav>
            <Logo></Logo>

            <MobileIcon onClick={toggleMenu}>

              <FaBars />

            </MobileIcon>
            
            <NavMenu isOpen={isOpen}>

              <NavigationLink to='/'>Home</NavigationLink>
              
              <NavigationLink  to='/help' >Projects</NavigationLink>

              <NavigationLink  to='/projects' >Contact</NavigationLink>

            </NavMenu>
            
            <NavBtn>    
              {button}
            </NavBtn>

        </Nav>
      </>
    );
    }

  

export default Navbar

