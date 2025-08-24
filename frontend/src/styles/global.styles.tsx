import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { fadeInUp } from "./animation";

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    /* background: linear-gradient(135deg, #e8f4f8 0%, #f5f0ff 50%,rgb(170, 170, 170) 100%); */
    min-height: 100vh;
    overflow-x: hidden;
  }
`;

export const ProjectButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

export const ProjectButton = styled.button`
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