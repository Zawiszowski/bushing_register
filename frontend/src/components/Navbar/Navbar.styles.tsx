
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import zawilogo from '../../assets/zawi4.png'



export const Logo = styled.img.attrs({
  src: `${zawilogo}`
  })`
  width: 50px;
  height: 50px;
  margin: 15px;
  @media screen and (max-width: 768px) {
    margin-left: 4rem;
  }

`;

export const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #bfbfd5;
    `;

export const Nav = styled.nav`
    background: white;
    border-bottom: 1px solid grey;
    border-top: 2px solid black;
    
    /* height: 65px; */
    display: flex;
    top: 0;

    justify-content: space-between;
    /* padding: 0.2rem calc((100vw - 1200px) / 2); */
    z-index: 12;

    `;

export const NavigationLink = styled(NavLink)`
    font-size: medium;
    color: black;
    display: flex;
    
    align-items: center;
    
    text-decoration: none;
    padding: 0 1.5rem;
    height: 100%;
    cursor: pointer;
    &.active {
      color: #D6D7D8;

    }
    &:hover{
        transition: all 0.2s ease-in-out;
        color: #2A4B57;
    }
  `;

export const NavigationLinkWebTitle = styled(NavLink)`
    font-size: x-large;
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0rem;
    height: 100%;
    cursor: pointer;
    &.active {
      color: white;
    }
    &:hover{
        transition: all 0.2s ease-in-out;
        color: #2A4B57;
    }
`;

  
export const NavMenu = styled.div<{ isOpen: boolean }>`

  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 90px;
    justify-content: center;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
  }

`;
  
export const NavBtn = styled.nav`
  font-size: medium;
  display: flex;
  align-items: center;
  margin-right: 24px;
  
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: flex
  }

`;
  
export const NavBtnLink = styled(NavLink)`
  border-radius: 20px;
  background:rgb(153, 191, 199);
  padding: 10px 15px;
  color:white;
  outline: none;
  border: 1px, solid rgb(153, 191, 199);;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background:rgb(178, 210, 216);
    border: 1px, solid rgb(178, 210, 216);
    color: white;
  }

`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    /* top: 0; */
    left: 15px;
    /* justify-content: center; */
    transform: translate(20%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;




