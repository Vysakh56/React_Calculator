import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [showExpression, setShowExpression] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // Prevent default actions for certain keys
      if (['Enter', 'Escape', 'Backspace'].includes(key)) {
        event.preventDefault();
      }

      if ('0123456789'.includes(key)) {
        handleClick(key);
      } else if (['+', '-', '*', '/', '%'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        handleClick('=');
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 's') {
        handleClick('√');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentInput, expression]);

  const handleClick = (value) => {
    if (value === '√') {
      handleSquareRoot();
      return;
    }

    if (value === '-') {
      if (currentInput === '' || expression.endsWith(' ')) {
        setCurrentInput((prev) => (prev ? prev : '-') );
        return;
      } else {
        setCurrentInput((prev) => `-${prev}`);
        return;
      }
    }

    if (['+', '*', '/', '%'].includes(value)) {
      if (currentInput) {
        setExpression((prev) => `${prev} ${currentInput} ${value}`);
        setCurrentInput('');
        setShowExpression(true);
      }
    } else if (value === '=') {
      handleEquals();
    } else {
      setCurrentInput((prev) => prev + value);
      setShowExpression(true);
    }
  };

  const handleSquareRoot = () => {
    const num = currentInput ? parseFloat(currentInput) : 0;
    if (num >= 0) {
      const result = Math.sqrt(num).toString();
      setCurrentInput(result);
      setExpression('');
      setShowExpression(false);
    } else {
      setExpression('Error');
      setCurrentInput('');
    }
  };

  const handleEquals = () => {
    const fullExpression = expression + (currentInput ? ' ' + currentInput : '');
    try {
      const evaluated = eval(fullExpression);
      setExpression('');
      setCurrentInput(evaluated.toString());
      setShowExpression(false);
    } catch (error) {
      setExpression('Error');
      setCurrentInput('');
    }
  };

  const handleClear = () => {
    setExpression('');
    setCurrentInput('');
    setShowExpression(false);
  };

  const handleDelete = () => {
    if (currentInput) {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (expression) {
      const updatedExpression = expression.trim().split(' ').slice(0, -1).join(' ');
      setExpression(updatedExpression);
      setShowExpression(false);
    }
  };

  return (
    <div className="calculator">
      <div className="heading">Calculator</div>
      <div className="display">
        {showExpression ? (
          <>
            <div className="expression">{expression.trim()}</div>
            <div className="input">{currentInput}</div>
          </>
        ) : (
          <div className="input">{expression || currentInput}</div>
        )}
      </div>
      <div className="buttons">
        <button className="special" onClick={handleClear}>AC</button>
        <button className="special" onClick={handleDelete}>DEL</button>
        <button className="operator_extra" onClick={() => handleClick('%')}>%</button>
        <button className="operator" onClick={() => handleClick('/')}>/</button>
        <button className="number" onClick={() => handleClick('7')}>7</button>
        <button className="number" onClick={() => handleClick('8')}>8</button>
        <button className="number" onClick={() => handleClick('9')}>9</button>
        <button className="operator" onClick={() => handleClick('*')}>*</button>
        <button className="number" onClick={() => handleClick('4')}>4</button>
        <button className="number" onClick={() => handleClick('5')}>5</button>
        <button className="number" onClick={() => handleClick('6')}>6</button>
        <button className="operator" onClick={() => handleClick('-')}>-</button>
        <button className="number" onClick={() => handleClick('1')}>1</button>
        <button className="number" onClick={() => handleClick('2')}>2</button>
        <button className="number" onClick={() => handleClick('3')}>3</button>
        <button className="operator" onClick={() => handleClick('+')}>+</button>
        <button className="number" onClick={() => handleClick('.')}>.</button>
        <button className="number" onClick={() => handleClick('0')}>0</button>   
        <button className="operator_extra" onClick={() => handleClick('√')}>√</button>
        <button className="operator" onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
