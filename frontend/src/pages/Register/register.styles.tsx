import styled from 'styled-components'
import { fadeInUp } from '../../styles/animation';


export const FadingImage = styled.image`

`

export const Context = styled.main`

  background-color:rgb(255, 255, 255);//#6d6d73;
  background-image: linear-gradient(to bottom right, #C4C7C8, #2B3231);
  padding: 3px;
  margin-bottom: 2px;
  min-height: 100vh;

`;

export const Footer = styled.footer`

  background-color: #2B3231;//#727878;//#6d6d73;
  padding: 3px;
  margin-bottom: 2px;
  text-align: center;

`;

export const AddTM = styled.button`

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

  margin: 0.25em;
  border-radius: 7px;
  


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

export const SpanWrapper = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 470px) {
    flex-direction: column;
  }

`
export const Span = styled.span`
    padding: 0.75rem;
    /* border: 2px, solid #727878; */
    background-color: rgb(212, 212, 212);
    border-radius: 15px;

    
    cursor:pointer;

    &.active {
      padding: 0.75rem;
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
background-color: ${({ hasPhotos }) => (hasPhotos ? 'rgb(195, 210, 231)' : 'rgb(240, 211, 211)')}; 
border-radius: 0.5rem;

&:hover{
  border-radius: 0.5rem;
  transition: background-color 0.5s ease-in-out;
  background-color: rgb(255, 255, 255);
}

`

export const RegisterSection = styled.section`
  background: rgba(208, 225, 241, 0.5);
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  border-radius: 30px;
  margin: 0 auto;
  animation: ${fadeInUp} 1s ease-out;
`;
