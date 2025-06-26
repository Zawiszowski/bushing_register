import styled from 'styled-components'

// export const Button = styled(NavLink)`
//   border-radius: 4px;
//   background: #bfbfd5;
//   padding: 10px 22px;
//   color: #000000;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;
//   /* Second Nav */
//   margin-left: 24px;
//   &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #ffffff;
//     color: #000000;
//   }
// `;


export const FadingImage = styled.image`

`

export const Context = styled.main`

  background-color: #727878;//#6d6d73;
  background-image: linear-gradient(to bottom right, #C4C7C8, #2B3231);
  padding: 3px;
  margin-bottom: 2px;
  min-height: 100vh;

`;

export const Footer = styled.footer`

  background-color: #2B3231;//#727878;//#6d6d73;
  /* background-image: linear-gradient(to bottom right, #C4C7C8, #2B3231); */
  padding: 3px;
  margin-bottom: 2px;
  text-align: center;

`;

export const AddTM = styled.button`
  /* display: inline-block; */

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #727878;
  border-radius: 10px;
  display: block;
  background-color: #727878;
  color: white;
  
  
  &:hover {
    font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
  display: block;
  background-color: black;
  color: white;
  }
`

export const EditTM = styled(AddTM)`
  
  /* display: inline-block; */

  /* font-size: 1em; */
  margin: 0.25em;
  /* padding: 0.25em 1em; */
  /* border: 2px solid #5e616e; */
  border-radius: 7px;
  /* display: block; */
  /* background-color: #5e616e; */
  /* color: white; */
  
  

  &:hover {
    /* font-size: 1em; */
  margin: 0.25em;
  /* padding: 0.25em 1em; */
  /* border: 2px solid black; */
  border-radius: 7px;
  /* display: block; */
  /* background-color: black;
  color: white; */
  }

`

export const DeleteTM = styled(EditTM)`
  
  /* display: inline-block; */

  /* font-size: 1em;
  /* margin: 0.25em; */
  padding: 0.25em 0.5em; 
  border: 2px solid #DB6653;
  /* border-radius: 7px;
  display: block; */
  background-color: #DB6653;
  /* color: white; */
  
  

  &:hover {
    /* font-size: 1em;
  /* margin: 0.25em; */
   padding: 0.25em 0.5em;
  border: 2px solid #D4503D;
  /* border-radius: 7px; */
  /* display: block;  */
  background-color: #D4503D;
  /* color: white; */
  }

`
export const Span = styled.span`
    padding: 8px;
    /* border: 2px, solid #727878; */
    background-color: rgb(212, 212, 212);
    border-radius: 10px;

    
    cursor:pointer;

    &.active {
      padding: 8px;
      background-color: #727878;
      color:white;
    }

`
export const InnerContainer = styled.div`
  /* height: 100vh;
  width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


`;

export const WrapperContainer = styled.div<{hasPhotos : boolean}>`

margin: 0.5rem;
padding: 0.5rem;
/* background-color: rgb(233, 231, 231); */
/* background-color: rgb(231, 196, 196); */
/* border-bottom: 1px solid black; */
background-color: ${({ hasPhotos }) => (hasPhotos ? 'rgb(233, 231, 231)' : 'rgb(231, 196, 196)')}; 
border-radius: 0.5rem;

&:hover{
  border-radius: 0.5rem;
  transition: background-color 0.5s ease-in-out;
  background-color: rgb(156, 156, 156);
}

`
