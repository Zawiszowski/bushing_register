import {useState} from "react";

import {
    Nav,
    NavigationLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Logo,

    MobileIcon,
    BrandName

}

from './Navbar.styles';
import { FaBars } from 'react-icons/fa';
import { useAuthContext } from "../../context/AuthContext";


const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);

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
         
            <div >
            <Logo></Logo>
            <BrandName>stevesleeve</BrandName>
            </div>
         
              
            <MobileIcon onClick={toggleMenu}>

              <FaBars />

            </MobileIcon>
            
            <NavMenu isOpen={isOpen}>

              <NavigationLink to='/'>Home</NavigationLink>
              
              <NavigationLink  to='/register' >Register</NavigationLink>

              <NavigationLink  to='/calculator' >Stiffnes calculator</NavigationLink>

            

            </NavMenu>
            
            <NavBtn>    
              {button}
            </NavBtn>

        </Nav>
      </>
    );
    }

  

export default Navbar

