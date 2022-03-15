import React from "react";
import "./Calculator.css"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      lastKeyPress: "",
      operation: "",
      storedValue: 0,
    }
    this.onClickClear = this.onClickClear.bind(this);
    this.onClickNumber = this.onClickNumber.bind(this);
    this.onClickZero = this.onClickZero.bind(this);
    this.onClickDecimal = this.onClickDecimal.bind(this);
    this.onClickOperation = this.onClickOperation.bind(this);
    this.onClickEquals = this.onClickEquals.bind(this);
  }

  setDisplay(str) {
    this.setState({display: str});
  }

  appendToDisplay(str) {
    this.setState((prevState) => ({
      display: prevState.display + str
    }))
  }

  getDisplayValue() {
    return parseFloat(this.state.display);
  }

  onClickClear() {
    this.setState({
      display: "0",
      lastKeyPress: "",
      operation: "",
      storedValue: 0,
      negativeEnabled: false
    })
  }

  onClickNumber(e) {
    const clickedNum = e.target.textContent;
    // dont allow leading 0's
    if(this.state.display === "0") {
      this.setState({display: clickedNum});
    } else {
      // if we just clicked an operation button
      if(this.state.lastKeyPress === "operation") {
        // store the currently displayed value and replace it with the new input
        this.setState({storedValue: this.getDisplayValue()})
        if(this.state.negativeEnabled) {
          // apply negative sign to the next input if negative has been toggled on
          const negativeClickedNum = -Math.abs(parseFloat(clickedNum));
          // display the negative value
          this.setDisplay(negativeClickedNum);
          // reset the negative flag
          this.setState({negativeEnabled: false});
        } else {
          this.setDisplay(clickedNum);
        }
      } else {
        // else continue to append numbers to the current input
        this.appendToDisplay(clickedNum);
      }
    }
    this.setState({lastKeyPress: "number"});
  }

  onClickZero() {
    if(this.state.display !== "0") {
      this.appendToDisplay("0")
    }
  }

  onClickDecimal() {
    if(this.state.display.includes(".") === false) {
      this.appendToDisplay(".");
    }
  }

  performLastClickedOperation() {
    const storedValue = this.state.storedValue;
    const displayValue = this.getDisplayValue();
    const lastOperation = this.state.operation;
    let result;

    switch (lastOperation) {
      case "add":
        result = storedValue + displayValue; 
        break;
      case "subtract":
        result =  storedValue - displayValue;
        break;
      case "multiply":
        result = storedValue * displayValue;
        break;
      case "divide":
        result = storedValue / displayValue;
        break;
      default:
        result = 0;
        break;
    }
    return result.toString();
  }

  onClickOperation(e) {
    const displayedValue = this.getDisplayValue();
    // toggle the negative sign when clicking the minus button after consecutive operations
    if(this.state.lastKeyPress === "operation" && e.target.id === "subtract") {
      this.setState((prevState) => ({
        negativeEnabled: !prevState.negativeEnabled
      }));
      return;
    } else if(this.state.lastKeyPress === "operation" && e.target.id !== "subtract" && this.state.negativeEnabled) {
      //reset the negative flag to false if we click other non subtract operations in sequence
      this.setState({negativeEnabled: false});
    }

    // Perform the last recorded non subsequent operation, excluding subtract
    if(this.state.operation !== "" && this.state.lastKeyPress === "number") {
      let result = this.performLastClickedOperation();
      this.setState({
        display: result.toString(),
        storedValue: displayedValue,
      });
    }
    // store the previously displayed value
    this.setState({
      lastKeyPress: "operation",
      operation: e.target.id,
    });
    console.log(`storedValue: ${this.state.storedValue}  |  displayValue: ${this.state.display}  |  operation: ${this.state.operation}  |  negativeEnabled: ${this.state.negativeEnabled}`)
  }

  
  onClickEquals() {
    const displayedValue = this.getDisplayValue();
    // perform the last recorded operation
    if(this.state.operation !== "") {
      let result = this.performLastClickedOperation();
      // if first equals click, update display and stored value
      if(this.state.lastKeyPress !== "equals") {
        this.setState({
          display: result.toString(),
          storedValue: displayedValue
        });
      } else {
        // if subsequent equals click, just update the displayed result
        this.setState({
          display: result.toString(),
        });
      }
    }
    this.setState({lastKeyPress: "equals"});
    console.log(`storedValue: ${this.state.storedValue}  |  displayValue: ${this.state.display}  |  operation: ${this.state.operation}  |  negativeEnabled: ${this.state.negativeEnabled}`)
  }


  render() {
    return (
      <div className="Calculator">

        <div className="display-container">
          <button id="clear" onClick={this.onClickClear}>C</button>
          <span id="display">{this.state.display}</span>
        </div>

        <div className="pad">
          <div className="operations">
            <button id="divide" onClick={this.onClickOperation}>/</button>
            <button id="multiply" onClick={this.onClickOperation}>&#215;</button>
            <button id="subtract" onClick={this.onClickOperation}>&#8722;</button>
            <button id="add" onClick={this.onClickOperation}>+</button>
            <button id="equals" onClick={this.onClickEquals}>=</button>
          </div>
          
          <div className="numpad">
            <div className="row">
              <button id="seven" onClick={this.onClickNumber}>7</button>
              <button id="eight" onClick={this.onClickNumber}>8</button>
              <button id="nine" onClick={this.onClickNumber}>9</button>
            </div>
            <div className="row">
              <button id="four" onClick={this.onClickNumber}>4</button>
              <button id="five" onClick={this.onClickNumber}>5</button>
              <button id="six" onClick={this.onClickNumber}>6</button>
            </div>
            <div className="row">
              <button id="one" onClick={this.onClickNumber}>1</button>
              <button id="two" onClick={this.onClickNumber}>2</button>
              <button id="three" onClick={this.onClickNumber}>3</button>
            </div>
            <div className="row last-row">
              <button id="zero" onClick={this.onClickZero}>0</button>
              <button id="decimal" onClick={this.onClickDecimal}>.</button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Calculator;