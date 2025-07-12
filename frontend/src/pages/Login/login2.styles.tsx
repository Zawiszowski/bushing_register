import styled from "styled-components";
import { pulse, spin, fadeInUp } from "../../styles/animation";

export const Container = styled.div`
  min-height: 70vh;
  margin: 4rem 0 4rem 0 ;
  /* background: linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%); */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0.5rem 4rem 0.5rem ;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out;
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  /* background: rgba(0, 0, 0, 0.2); */
`;

export const AnimatedCircle = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(40px);
  animation: ${pulse} 4s ease-in-out infinite;
  
  &:nth-child(1) {
    top: -10rem;
    right: -10rem;
    background: #a855f7;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    bottom: -10rem;
    left: -10rem;
    background: #3b82f6;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #6366f1;
    animation-delay: 0.5s;
  }
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
`;

export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(45deg,rgb(188, 216, 243),rgb(34, 101, 184));
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const IconWrapperWait = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(45deg,rgb(188, 216, 243),rgb(34, 101, 184));
  border-radius: 50%;
  margin-bottom: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: black;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #d1d5db;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #e5e7eb;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconLeft = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color:rgb(101, 133, 189);
`;

export const Input = styled.input<{hasRightIcon: Boolean, hasError: Boolean}>`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  padding-right: ${({hasRightIcon}) => hasRightIcon ? '3rem' : '1rem'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid ${(props) => props.hasError ? '#ef4444' : 'rgba(20, 19, 19, 0.2)'};
  border-radius: 0.5rem;
  color: black;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color:rgb(124, 124, 124);
  }
  
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: ${(props) => props.hasError ? '#ef4444' : 'rgba(20, 19, 19, 0.2)'};
    // border-color: transparent;
  }
`;

export const IconRight = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: black;
  }
`;

export const ErrorMessage = styled.p`
  color: #fca5a5;
  font-size: 0.875rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg,rgb(188, 216, 243),rgb(109, 136, 168));
  color: black;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: scale(1);
  
  &:hover:not(:disabled) {
    background: linear-gradient(45deg,rgb(188, 216, 243),rgb(9, 58, 117));
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid transparent;
  border-bottom: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-right: 0.5rem;
`;

export const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const ForgotPasswordLink = styled.button`
  font-size: 0.875rem;
  color: #d1d5db;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: black;
  }
`;

export const ToggleSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const ToggleText = styled.p`
  color: #d1d5db;
`;

export const ToggleButton = styled.button`
  margin-left: 0.5rem;
  color:rgb(132, 180, 252);
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color:rgb(214, 231, 254);
  }
`;