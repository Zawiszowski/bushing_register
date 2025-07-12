import { HandPlatter } from 'lucide-react';
import { Container, FormWrapper, FormContainer, Header, IconWrapperWait, Title, Subtitle
 } from './login2.styles';


const Activate = () => {


  return (
    <Container>

      <FormWrapper>
        <FormContainer>

            <Header>
            <IconWrapperWait>
                <HandPlatter size={32} color="white" />

            </IconWrapperWait>
            
            <Title>
              Activation in progress
            </Title>
            <Subtitle>
              Hello again ! Your account is getting activated.
            </Subtitle>
              <Subtitle>
              Please wait. 
            </Subtitle>
          </Header>

          
          
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default Activate;