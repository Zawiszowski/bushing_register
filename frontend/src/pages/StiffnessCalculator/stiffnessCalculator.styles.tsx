import styled from 'styled-components'
import steve from '../../assets/steve_dimensions_transparent3.png'
import {float} from "../../styles/animation";

export const SteveDimensions = styled.img.attrs({
  src: `${steve}`
  })`

  width: 600px;
  height: 500px;
  animation: ${float} 3s ease-in-out infinite;
  /* margin: 1rem; */
  @media screen and (max-width: 877px) {
    margin-left: 4rem;
  }

`;

export const FloatingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
`;