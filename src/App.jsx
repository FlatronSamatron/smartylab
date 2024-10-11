import { useState } from 'react'
import buttons from './assets/buttons'

function App() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [secondOperand, setSeconOperand] = useState(null);
  const [operator, setOperator] = useState(null);

  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

  const handleNumberClick = (value) => {
    if (!operator) {
      const newDisplay = firstOperand ? firstOperand + value : value;
      setFirstOperand(newDisplay);
      setDisplay(newDisplay);
    } else {
      const newDisplay = secondOperand ? secondOperand + value : value;
      setSeconOperand(newDisplay);
      setDisplay(firstOperand + operator + newDisplay);
    }
  };

  const clear = () => {
    setFirstOperand(null);
    setSeconOperand(null);
    setOperator(null);
  }

  const handleOperatorClick = (value) => {
    if(value === 'CLEAR'){
      setDisplay('0');
      clear()
    } else if (value === "DEL") {
      if(secondOperand){
        const newValue = secondOperand.slice(0,-1);
        setSeconOperand(newValue);
        setDisplay(firstOperand + operator + newValue);
      } 
      if (!secondOperand && operator) {
        setOperator(null);
        setDisplay(firstOperand);
      } 
      if (firstOperand && !secondOperand && !operator) {
        const newValue = firstOperand.slice(0, -1);
        setFirstOperand(newValue);
        setDisplay(newValue);
      } else {
        console.log(display);
        const newValue = display.toString().slice(0, -1);
        setDisplay(newValue);
      }
    } else if (value === "=") {
      setDisplay(calculate());
      clear();
    } else {
      if (!operator) {
        setOperator(value);
        setDisplay(display + value);
      } else if (operator && secondOperand) {
        setDisplay(calculate() + value);
        setOperator(value);
        setFirstOperand(calculate());
        setSeconOperand(null);
      } else {
        return;
      }
    }
  };

  const calculate = () => {
    switch (operator) {
      case "+":
        return Number(firstOperand) + Number(secondOperand);
      case "-":
        return Number(firstOperand) - Number(secondOperand);
      case "x":
        return Number(firstOperand) * Number(secondOperand);
      case "/":
        return Number(firstOperand) / Number(secondOperand);
      default:
        return secondOperand;
    }
  };

  const handleClick = (value) => {
    if (!isNumeric(value)) {
      handleOperatorClick(value);
    } else {
      handleNumberClick(value);
    }
  };

  return (
    <div className="flex w-full justify-center flex-col items-center space-y-5 mt-5">
      <div className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-3">
        <h1 className="text-3xl font-bold text-center">Calculator!</h1>
        <div className="w-[300px] space-y-3">
          <div className="flex items-center bg-white border border-gray-300 text-gray-900 rounded-lg h-14 text-xl pl-2">
            {display}
          </div>
          <div className="flex justify-between flex-wrap gap-2">
            {buttons.map(({ title, className }) => {
              return (
                <div
                  className={`rounded-lg flex justify-center items-center cursor-pointer h-10 ${className}`}
                  key={title}
                  onClick={() => handleClick(title)}
                >
                  {title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
