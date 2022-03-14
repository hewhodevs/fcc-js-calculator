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
    this.onClickAdd = this.onClickAdd.bind(this);
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
    })
  }

  onClickNumber(e) {
    const clickedNum = e.target.textContent;
    if(this.state.display === "0") {
      // dont allow leading 0's
      this.setState({display: clickedNum});
    } else {
      if(this.state.lastKeyPress === "operation") {
        // show new number if user prev key press was an operation
        this.setDisplay(clickedNum);
      } else {
        // else continue to append numbers to the current input
        this.appendToDisplay(clickedNum);
      }
    }
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

  onClickAdd() {
    // get previous storedValue
    const prevStoredValue = this.state.storedValue;
    // store current value and operation pressed
    this.setState({
      lastKeyPress: "operation",
      operation: "add",
      storedValue: this.getDisplayValue()
    });
    // perform operation
    let result = prevStoredValue + this.getDisplayValue();
    this.setDisplay(result.toString());
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
            <button id="divide">/</button>
            <button id="multiply">&#215;</button>
            <button id="subtract">&#8722;</button>
            <button id="add" onClick={this.onClickAdd}>+</button>
            <button id="equals">=</button>
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