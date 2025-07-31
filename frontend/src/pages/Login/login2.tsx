import React, { useState,useEffect } from 'react';

import { Eye, EyeOff, User, Mail, Lock, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Container, FormWrapper, FormContainer, Header, IconWrapper, Title, Subtitle, FormContent, FieldGroup,
    Label, InputWrapper, IconLeft, IconRight, Input, ErrorMessage, SubmitButton, LoadingWrapper, Spinner, ForgotPassword, ForgotPasswordLink,
    ToggleButton, ToggleSection, ToggleText
 } from './login2.styles';
 import { useAuthContext } from '../../context/AuthContext';
 import useDeboundce from '../../hooks/useDebounce';
 import { useNavigate } from 'react-router-dom';
 import { DRF_ADRESS } from '../../data/constants';
 interface Error {
    email: string;
    password: string;
    name: string;
    surename: string,
    confirmPassword: string;
    errorCount: number;

 }

 const defaultFormData = {
     name: '',
    surename: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const defaultError = {email: '', password: '', name:'', surename: '', confirmPassword:'', errorCount: 0}


 

const AuthComponent = () => {
  const {loginUser, logoutUser, registerUser, user, authError, created} = useAuthContext()

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState(defaultFormData);
  const useDebounceValidate = useDeboundce(formData, 2000)
  const [errors, setErrors] = useState<Error>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate()
useEffect(() =>{
    setIsLoading(false)
    
  },[authError])
  useEffect(() =>{
    setIsLoading(false)
    setIsLogin(true)

  },[created])

  useEffect(()=>{
    if(useDebounceValidate === defaultFormData) return

    const newErrors = validateForm()
    setErrors(newErrors)

  },[useDebounceValidate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // when user writes it removes errors
    if (errors[name as keyof Error]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors:Error = {...defaultError};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!isLogin && !formData.surename.trim()) {
      newErrors.surename = 'Surename is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'The passwords are not identical';
    }

    newErrors.errorCount = 0
    Object.entries(newErrors).forEach( ([key, value]) => {

        if (value !== '' && key !== 'errorCount'){
            newErrors.errorCount += 1
        }
        
    })

    return newErrors;
  };

  const handleSubmit = () => {
    // if (e) e.preventDefault();

    const newErrors = validateForm();
    
    setErrors(newErrors);

    if ( newErrors.errorCount === 0){
        if (isLogin){
            setIsLoading(true);
            loginUser({email: formData.email, password: formData.password})
        }else{
            setIsLoading(true)
            registerUser({first_name: formData.name, last_name: formData.surename, email: formData.email, password: formData.password, password2: formData.confirmPassword})


        }
        

    }

    
    
  };

  const toggleMode = () => {

    setIsLogin(!isLogin);
    setFormData(defaultFormData);
    setErrors(defaultError);
  };

  return (
    <Container>

      <FormWrapper>
        <FormContainer>
        {!user.email ? 
        (<>
          <Header>
            <IconWrapper>
              {isLogin ? (
                <LogIn size={32} color="white" />
              ) : (
                <UserPlus size={32} color="white" />
              )}
            </IconWrapper>
            
            <Title>
              {isLogin ? 'Sign in' : 'Register'}
            </Title>
            <Subtitle>
              {isLogin 
                ? 'Hello again ! Enter your credencials.' 
                : 'Create new account to begin.'
              }
            </Subtitle>
          </Header>

          <FormContent>
            {/* Imię - tylko przy rejestracji */}
            {!isLogin && (
              <FieldGroup>
                <Label>Name</Label>
                <InputWrapper>
                  <IconLeft>
                    <User size={20} />
                  </IconLeft>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    hasError={!!errors.name}
                    hasRightIcon={false}
                  />
                </InputWrapper>
                {errors.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </FieldGroup>
            )}
            {/* nazwisko - tylko przy rejestracji */}
            {!isLogin && (
              <FieldGroup>
                <Label>Surename</Label>
                <InputWrapper>
                  <IconLeft>
                    <User size={20} />
                  </IconLeft>
                  <Input
                    type="text"
                    name="surename"
                    value={formData.surename}
                    onChange={handleInputChange}
                    placeholder="Enter your surname"
                    hasError={!!errors.surename}
                    hasRightIcon={false}
                  />
                </InputWrapper>
                {errors.surename && (
                  <ErrorMessage>{errors.surename}</ErrorMessage>
                )}
              </FieldGroup>
            )}

            {/* Email */}
            <FieldGroup>
              <Label>Email</Label>
              <InputWrapper>
                <IconLeft>
                  <Mail size={20} />
                </IconLeft>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  hasError={errors.email !== "" ? true:false}
                  hasRightIcon={false}
                />
              </InputWrapper>
              {errors.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </FieldGroup>

            {/* Hasło */}
            <FieldGroup>
              <Label>Password</Label>
              <InputWrapper>
                <IconLeft>
                  <Lock size={20} />
                </IconLeft>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  hasError={errors.password !== "" ? true:false}
                  hasRightIcon={true}
                />
                <IconRight
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </IconRight>
              </InputWrapper>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FieldGroup>

            {/* Potwierdzenie hasła - tylko przy rejestracji */}
            {!isLogin && (
              <FieldGroup>
                <Label>Confirm password</Label>
                <InputWrapper>
                  <IconLeft>
                    <Lock size={20} />
                  </IconLeft>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    hasError={errors.confirmPassword !== "" ? true:false}
                    hasRightIcon={true}
                  />
                  <IconRight
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </IconRight>
                </InputWrapper>
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </FieldGroup>
            )}

            {/* Submit Button */}
            <SubmitButton
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingWrapper>
                  <Spinner />
                  {isLogin ? 'Logging in...' : 'Registration in progress...'}
                </LoadingWrapper>
              ) : (
                isLogin ? 'Sign in' : 'Register'
              )}
            </SubmitButton>
            {authError.error !== '' && (
                <>
        
                  <ErrorMessage>{ isLogin ? 'Something went wrong during the process! \n Have you acivated your account?': 'Something went wrong during the process!'}</ErrorMessage>
                
                </>
            )}
          </FormContent>

          {/* Zapomniałeś hasła - tylko przy logowaniu */}
          {isLogin && (
            <ForgotPassword>
              <ForgotPasswordLink type="button" onClick={() => navigate('/password-reset')}>
                Forgot your password?
              </ForgotPasswordLink>
            </ForgotPassword>
          )}

          {/* Toggle Mode */}
          <ToggleSection>
            <ToggleText>
              {isLogin ? "Don't have the account?" : "Already have the account?"}
              <ToggleButton
                type="button"
                onClick={toggleMode}
              >
                {isLogin ? 'Register' : 'Sign in\n'}

              </ToggleButton>
              

            </ToggleText>
          </ToggleSection>
          {/* Regulations and private policy */}
          {/* {!isLogin && ( */}
            <ForgotPassword>
              <ForgotPasswordLink style={{fontSize: '0.875rem'}} type="button" onClick={() => window.open(`${DRF_ADRESS}/user_api/regulations/`, '_blank')}>
                Creating account you accept <u style={{color: 'black'}}>Privacy Policy and Regulations</u>
              </ForgotPasswordLink>
            </ForgotPassword>
           {/* )} */}
          {/* {isLogin ? null : ''} */}
          </>):
          (<>
            <Header>
            <IconWrapper>
                <LogOut size={32} color="white" />

            </IconWrapper>
            
            <Title>
              Logout
            </Title>
            <Subtitle>
              'Hello again ! Enter your credencials.' 
            </Subtitle>
          </Header>
          <FormContent>
            <FieldGroup>
              <Label>Email</Label>
              <InputWrapper>
                <IconLeft>
                  <Mail size={20} />
                </IconLeft>
                <Input
                    name="password"
                    value={user.email}
                    style={{border: 'none'}}
                    hasError={errors.confirmPassword !== "" ? true:false}
                    hasRightIcon={true}
                    disabled={true}
                  />
                </InputWrapper>
            </FieldGroup>
            <SubmitButton
              type="button"
              onClick={() => logoutUser()}
     
            >
                Logout
            </SubmitButton>
            </FormContent>
          
          </>)
            }

        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default AuthComponent;