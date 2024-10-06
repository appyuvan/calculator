import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  background-color: ${props => props.theme.calculatorBackground};
  width: 100%;
  max-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
`;

const Display = styled.div`
  color: ${props => props.theme.displayText};
  font-size: 36px;
  text-align: right;
  padding: 20px;
  margin-bottom: 20px;
`;

const Expression = styled.div`
  font-size: 18px;
  color: ${props => props.theme.displayText}aa;
  margin-bottom: 10px;
`;

const Result = styled.div`
  font-size: 48px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.isOperator ? props.theme.operatorText : props.theme.buttonText};
  border: none;
  border-radius: 50%;
  font-size: 24px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }

  &:last-child {
    background: ${props => props.theme.equalBackground};
    color: ${props => props.theme.equalText};
    grid-column: span 2;
    border-radius: 35px;
    width: 100%;
  }
`;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setExpression(expression + value);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(expression);
      setDisplay(result.toString());
      setExpression(expression + ' = ' + result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const buttons = [
    'AC', '%', '÷', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.', 'C'
  ];

  return (
    <CalculatorContainer>
      <Display>
        <Expression>{expression}</Expression>
        <Result>{display}</Result>
      </Display>
      <ButtonGrid>
        {buttons.map((btn, index) => (
          <Button
            key={index}
            isOperator={['+', '-', '×', '÷', '%', '='].includes(btn)}
            onClick={() => {
              if (btn === 'AC') {
                handleClear();
              } else if (btn === '=') {
                handleCalculate();
              } else if (btn === 'C') {
                setDisplay(display.slice(0, -1) || '0');
                setExpression(expression.slice(0, -1));
              } else {
                handleButtonClick(btn === '×' ? '*' : btn === '÷' ? '/' : btn);
              }
            }}
          >
            {btn}
          </Button>
        ))}
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator;