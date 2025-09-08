import styled from 'styled-components'
import steve from '../../assets/steve_dimensions_transparent3.png'
import {float, fadeInUp} from "../../styles/animation";

export const SteveDimensions = styled.img.attrs({
  src: `${steve}`
  })`

  width: 50%;
  height: auto;
  animation: ${float} 3s ease-in-out infinite;
  /* margin: 1rem; */


`;

export const FloatingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(167, 139, 250, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }
`;

export const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(221, 235, 247, 0.5);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 30px;
  border: 1px solid rgba(139, 196, 250, 0.2);

`;

export const FlexCenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }

`