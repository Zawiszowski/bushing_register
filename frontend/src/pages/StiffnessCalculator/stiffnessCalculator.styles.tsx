import styled from 'styled-components'
import steve from '../../assets/steve_dimensions_transparent3.png'
import {float, fadeInUp} from "../../styles/animation";

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

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(167, 139, 250, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }
`;