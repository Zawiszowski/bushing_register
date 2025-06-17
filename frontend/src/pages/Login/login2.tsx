import React, { useState,useEffect, type HTMLAttributeAnchorTarget } from 'react';

import { Eye, EyeOff, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Container, BackgroundOverlay, BackgroundContainer, AnimatedCircle, FormWrapper, FormContainer, Header, IconWrapper, Title, Subtitle, FormContent, FieldGroup,
    Label, InputWrapper, IconLeft, IconRight, Input, ErrorMessage, SubmitButton, LoadingWrapper, Spinner, ForgotPassword, ForgotPasswordLink,
    ToggleButton, ToggleSection, ToggleText
 } from './login2.styles';
 import { useAuthContext } from '../../context/AuthContext';

 interface Error {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    errorCount: number;

 }

 

const AuthComponent = () => {
    const {loginUser, user, logoutUser, authError} = useAuthContext()

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Error>({email: '', password: '', name:'', confirmPassword:'', errorCount: 0});
  const [isLoading, setIsLoading] = useState(false);

useEffect(() =>{
    setIsLoading(false)

  },[authError])

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
    const newErrors:Error = {email: '', password: '', name:'', confirmPassword:'', errorCount: 0};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email jest nieprawidłowy';
    }

    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Potwierdzenie hasła jest wymagane';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
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
        setIsLoading(true);
        loginUser({email: formData.email, password: formData.password})

    }

    
    
    
    // Symulacja API call
    // setTimeout(() => {
    //   try {
    //     if (isLogin) {
    //       console.log('Logowanie:', { email: formData.email, password: formData.password });
    //       alert('Pomyślnie zalogowano!');
    //     } else {
    //       console.log('Rejestracja:', { 
    //         name: formData.name, 
    //         email: formData.email, 
    //         password: formData.password 
    //       });
    //       alert('Pomyślnie zarejestrowano!');
    //     }
        
    //     // Reset formularza
    //     setFormData({
    //       name: '',
    //       email: '',
    //       password: '',
    //       confirmPassword: ''
    //     });
    //   } catch (error) {
    //     alert('Wystąpił błąd. Spróbuj ponownie.');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }, 2000);
  };

  const toggleMode = () => {

    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({email: '', password: '', name:'', confirmPassword:'', errorCount: 0});
  };

  return (
    <Container>
      {/* <BackgroundOverlay /> */}
      
      {/* <BackgroundContainer>
        <AnimatedCircle />
        <AnimatedCircle />
        <AnimatedCircle />
      </BackgroundContainer> */}

      <FormWrapper>
        <FormContainer>
          <Header>
            <IconWrapper>
              {isLogin ? (
                <LogIn size={32} color="white" />
              ) : (
                <UserPlus size={32} color="white" />
              )}
            </IconWrapper>
            <Title>
              {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
            </Title>
            <Subtitle>
              {isLogin 
                ? 'Witaj ponownie! Wprowadź swoje dane.' 
                : 'Stwórz nowe konto, aby rozpocząć.'
              }
            </Subtitle>
          </Header>
        {!user ? 
        (<>
          <FormContent>
            {/* Imię - tylko przy rejestracji */}
            {!isLogin && (
              <FieldGroup>
                <Label>Imię</Label>
                <InputWrapper>
                  <IconLeft>
                    <User size={20} />
                  </IconLeft>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Wprowadź swoje imię"
                    hasError={!!errors.name}
                    hasRightIcon={false}
                  />
                </InputWrapper>
                {errors.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
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
                  placeholder="wprowadz@email.com"
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
              <Label>Hasło</Label>
              <InputWrapper>
                <IconLeft>
                  <Lock size={20} />
                </IconLeft>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Wprowadź hasło"
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
                <Label>Potwierdź hasło</Label>
                <InputWrapper>
                  <IconLeft>
                    <Lock size={20} />
                  </IconLeft>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Potwierdź hasło"
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
              onClick={_ => handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingWrapper>
                  <Spinner />
                  {isLogin ? 'Logowanie...' : 'Rejestracja...'}
                </LoadingWrapper>
              ) : (
                isLogin ? 'Zaloguj się' : 'Zarejestruj się'
              )}
            </SubmitButton>
          </FormContent>

          {/* Zapomniałeś hasła - tylko przy logowaniu */}
          {isLogin && (
            <ForgotPassword>
              <ForgotPasswordLink type="button">
                Zapomniałeś hasła?
              </ForgotPasswordLink>
            </ForgotPassword>
          )}

          {/* Toggle Mode */}
          <ToggleSection>
            <ToggleText>
              {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
              <ToggleButton
                type="button"
                onClick={toggleMode}
              >
                {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
              </ToggleButton>
            </ToggleText>
          </ToggleSection>
          </>):
          (<>
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
              onClick={_ => logoutUser()}
     
            >
                Wyloguj się
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