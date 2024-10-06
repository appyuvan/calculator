import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Calculator from './components/Calculator';
import { lightTheme, darkTheme } from './themes';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.toggleHoverBackground};
  }
`;

const ThemeIcon = styled.span`
  color: ${props => props.theme.toggleColor};
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppContainer>
        <ThemeToggle onClick={toggleTheme}>
          <ThemeIcon>{isDarkTheme ? '☀️' : '🌙'}</ThemeIcon>
        </ThemeToggle>
        <Calculator />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;