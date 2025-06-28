
import { Container, BackgroundElements, FloatingShape, HeroSection, HeroSubtitle, HeroTitle, ButtonGroup, Button
 } from '../Home/home.styles';


// Main Component
const StiffnesCalculator = () => {
  



  return (
    <>
      
      <Container>
        <BackgroundElements>
          <FloatingShape duration="8s" delay="0s" />
          <FloatingShape duration="10s" delay="2s" />
          <FloatingShape duration="7s" delay="4s" />
          <FloatingShape duration="9s" delay="1s" />
        </BackgroundElements>
        
        <HeroSection>
          <HeroTitle>
            Stiffness calculator<br />
            Registry System
          </HeroTitle>
          <HeroSubtitle>
            The most advanced bushing calculation system for simulation stiffness factors. 
            Streamline your inventory, optimize maintenance schedules, and ensure precision in every project.
          </HeroSubtitle>
          {/* <ButtonGroup>
            <Button className="primary">Start Free Trial</Button>
            <Button className="secondary">Watch Demo</Button>
          </ButtonGroup> */}
                    <HeroSubtitle>
                comming soon ...
          </HeroSubtitle>
        </HeroSection>


      </Container>
    </>
  );
};

export default StiffnesCalculator;