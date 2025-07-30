import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HandPlatter } from 'lucide-react';
import { Container, FormWrapper, FormContainer, Header, IconWrapperWait, Title, Subtitle
 } from './login2.styles';
import { DRF_ADRESS } from '../../data/constants';
import { useAuthContext } from '../../context/AuthContext';
import { notify_error, notify_success } from '../../utils/basicToasts';



const Activate = () => {
  const {uid, token} = useParams()
  const navigate = useNavigate()
  let {config} = useAuthContext();

  useEffect(() => {
    
    axios.get(DRF_ADRESS + `/user_api/activate/${uid}/${token}/`, config)
    .then(_ => {
      notify_success('Account successfully activated')
      navigate('/')
    })
    .catch(error => {
      console.log(error)
      notify_error('Something went wrong')
    })


  },[])


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