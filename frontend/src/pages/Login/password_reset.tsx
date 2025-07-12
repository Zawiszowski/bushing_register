import { HeartCrack } from 'lucide-react';
import { Container, FormWrapper, FormContainer, Header, IconWrapperWait, Title, Subtitle
 } from './login2.styles';


const PasswordReset = () => {


  return (
    <Container>

      <FormWrapper>
        <FormContainer>

            <Header>
            <IconWrapperWait>
                <HeartCrack size={32} color="white" />

            </IconWrapperWait>
            
            <Title>
              Page in rebuild ...
            </Title>
            <Subtitle>
              Hello again ! Sorry function is not implemented yet.
            </Subtitle>
              <Subtitle>
              If you account any problem contact support.
            </Subtitle>
          </Header>

          
          
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default PasswordReset;