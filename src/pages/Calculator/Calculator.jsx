import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [secondOperand, setSecondOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
    const [clearOnce, setClearOnce] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            if (/\d/.test(key)) {
                handleNumber(key);
            } else if (key === '.') {
                handleDecimal('.');
            } else if (key === '+') {
                handleOperator('+');
            } else if (key === '-') {
                handleOperator('-');
            } else if (key === '*') {
                handleOperator('*');
            } else if (key === '/') {
                handleOperator('÷');
            } else if (key === 'Enter') {
                handleEqual();
            } else if (key === 'Backspace') {
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentInput, firstOperand, operator, waitingForSecondOperand, clearOnce]);

    const updateDisplay = (value) => {
        setCurrentInput(value);
        updateClearButton();
    };

    const updateClearButton = () => {
        return currentInput !== '0' ? 'C' : 'AC';
    };

    const handleNumber = (number) => {
        if (waitingForSecondOperand) {
            setCurrentInput(number);
            setWaitingForSecondOperand(false);
        } else {
            setCurrentInput(currentInput === '0' ? number : currentInput + number);
        }
        setClearOnce(false);
    };

    const handleOperator = (nextOperator) => {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            setOperator(nextOperator);
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setCurrentInput(`${parseFloat(result.toFixed(7))}`);
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
        setClearOnce(false);
    };

    const calculate = (firstOperand, secondOperand, operator) => {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '÷':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    };

    const handleClear = () => {
        if (clearOnce) {
            setCurrentInput('0');
            setFirstOperand(null);
            setSecondOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(false);
            setClearOnce(false);
        } else {
            setCurrentInput('0');
            setClearOnce(true);
        }
    };

    const handleDecimal = (dot) => {
        if (!currentInput.toString().includes(dot)) {
            setCurrentInput(currentInput + dot);
        }
    };

    const handleEqual = () => {
        const inputValue = parseFloat(currentInput);

        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, inputValue, operator);
            setCurrentInput(result);
            setFirstOperand(result);
            setSecondOperand(inputValue);
            setWaitingForSecondOperand(true);
            setClearOnce(false);
        } else if (secondOperand !== null) {
            const result = calculate(parseFloat(currentInput), secondOperand, operator);
            setCurrentInput(result);
            setFirstOperand(result);
        }
    };

    return (
        <div className="container-xl border p-3">
            <div className="calculator">
                <div className="show_result">{currentInput}</div>
                <div className="key_area">
                    <button className="text-black bg-light" onClick={() => handleOperator('+')}>+</button>
                    <button className="text-black bg-light" onClick={() => handleOperator('-')}>&minus;</button>
                    <button className="text-black bg-light" onClick={() => handleOperator('*')}>&times;</button>
                    <button className="text-black bg-light" onClick={() => handleOperator('÷')}>&divide;</button>

                    <button className='text-white' onClick={() => handleNumber('7')}>7</button>
                    <button className='text-white' onClick={() => handleNumber('8')}>8</button>
                    <button className='text-white' onClick={() => handleNumber('9')}>9</button>

                    <button className='text-white' onClick={() => handleNumber('4')}>4</button>
                    <button className='text-white' onClick={() => handleNumber('5')}>5</button>
                    <button className='text-white' onClick={() => handleNumber('6')}>6</button>

                    <button className='text-white' onClick={() => handleNumber('1')}>1</button>
                    <button className='text-white' onClick={() => handleNumber('2')}>2</button>
                    <button className='text-white' onClick={() => handleNumber('3')}>3</button>

                    <button className='text-white' onClick={() => handleNumber('0')}>0</button>
                    <button className='text-white' onClick={() => handleDecimal('.')}>.</button>
                    <button className='text-white' onClick={handleClear}>{updateClearButton()}</button>
                    <button className='text-white' id="equal_btn" onClick={handleEqual}>=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
