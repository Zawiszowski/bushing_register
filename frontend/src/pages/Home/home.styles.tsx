import styled from "styled-components";
import { fadeInUp, slideInLeft, float, pulse} from "../../styles/animation";

// Styled Components
export const Container = styled.main`
  min-height: calc(100vh - 160px);
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 1s ease-out;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg,rgb(92, 146, 246),rgb(129, 129, 129),rgb(31, 31, 31));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #64748B;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

export const Button = styled.button`
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &.primary {
    background: linear-gradient(45deg,rgb(139, 183, 250),rgb(128, 128, 128));
    color: white;
    box-shadow: 0 8px 25px rgba(139, 196, 250, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(139, 196, 250, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(167, 139, 250, 0.1);
    color:rgb(92, 141, 246);
    border: 2px solid rgba(139, 183, 250, 0.3);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(167, 139, 250, 0.2);
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #475569;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const FeatureCard = styled.div<{delay: string}>`
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${({delay}) => delay || '0s'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(167, 139, 250, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }
`;

export const FeatureIcon = styled.div<{delay: string}>`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg,rgb(139, 183, 250),rgb(82, 79, 81));
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${({delay}) => delay || '0s'};
`;

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  color: #64748B;
  line-height: 1.6;
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg,rgb(92, 159, 246),rgb(112, 131, 173));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(221, 235, 247, 0.5);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 30px;
  border: 1px solid rgba(139, 196, 250, 0.2);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const StatCard = styled.div<{delay: string}>`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  border: 1px solid rgba(167, 139, 250, 0.1);
  transition: transform 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${({delay}) => delay || '0s'};
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
  }
`;

export const Statstring = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg,rgb(188, 216, 243),rgb(109, 136, 168));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #64748B;
  font-weight: 500;
`;

export const InfoSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

export const InfoCard = styled.div<{delay: string}>`
  background: rgba(255, 255, 255, 0.6);
  padding: 2.5rem;
  border-radius: 25px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  backdrop-filter: blur(10px);
  animation: ${slideInLeft} 1s ease-out;
  animation-delay: ${({delay}) => delay || '0s'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(167, 139, 250, 0.4);
  }
`;

export const InfoTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoIcon = styled.span`
  font-size: 1.2rem;
  color:rgb(92, 133, 246);
`;

export const InfoText = styled.p`
  color: #64748B;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const InfoListItem = styled.li`
  color: #64748B;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }
`;

export const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

export const FloatingShape = styled.div<{delay: string, duration: string}>`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color || 'rgba(167, 139, 250, 0.1)'};
  animation: ${float} ${({duration}) => duration || '6s'} ease-in-out infinite;
  animation-delay: ${({delay}) => delay || '0s'};
  
  &:nth-child(1) {
    width: 150px;
    height: 150px;
    top: 10%;
    left: 5%;
  }
  
  &:nth-child(2) {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 10%;
    background: rgba(236, 72, 153, 0.1);
  }
  
  &:nth-child(3) {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 15%;
    background: rgba(16, 185, 129, 0.1);
  }
  
  &:nth-child(4) {
    width: 120px;
    height: 120px;
    bottom: 40%;
    right: 5%;
    background: rgba(251, 146, 60, 0.1);
  }
`;

export const ProcessSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(72, 75, 236, 0.1));
  margin: 2rem;
  border-radius: 30px;
`;

export const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const ProcessStep = styled.div<{delay: string}>`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  border: 1px solid rgba(139, 178, 250, 0.2);
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${({delay}) => delay || '0s'};
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.9);
  }
`;

export const Stepstring = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg,rgb(132, 138, 146),rgb(96, 174, 197));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
  font-size: 1.2rem;
`;

export const StepTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`;

export const StepDescription = styled.p`
  color: #64748B;
  line-height: 1.6;
  font-size: 0.95rem;
`;

export const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg,rgb(140, 173, 211),rgb(54, 112, 179));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
  font-size: 1.2rem;
`;