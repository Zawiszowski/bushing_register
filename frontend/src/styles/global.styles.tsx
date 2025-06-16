import { createGlobalStyle } from "styled-components";

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