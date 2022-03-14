import React from "react";
import "./Calculator.css"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
    }
    this.clearDisplay = this.clearDisplay.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  // clear the display
  clearDisplay() {
    this.setState({display: "0"});
  }

  // Show numbers as input on the display. prevent leading zero's on display
  showInput(inputNumString) {
    let currentDisplayValue = this.state.display;
    if(currentDisplayValue === "0") {
      // dont allow leading zero's
      this.setState({display: inputNumString})
    } else {
      this.setState((prevState) => ({
        display: prevState.display + inputNumString
      }));
    }
  }



  render() {
    return (
      <div className="Calculator">

        <div className="display-container">
          <button id="clear" onClick={this.clearDisplay}>C</button>
          <span id="display">{this.state.display}</span>
        </div>

        <div className="pad">
          <div className="operations">
            <button id="divide">/</button>
            <button id="multiply">&#215;</button>
            <button id="subtract">&#8722;</button>
            <button id="add">+</button>
            <button id="equals">=</button>
          </div>
          
          <div className="numpad">
            <div className="row">
              <button id="seven" onClick={() => {this.showInput("7")}}>7</button>
              <button id="eight" onClick={() => {this.showInput("8")}}>8</button>
              <button id="nine" onClick={() => {this.showInput("9")}}>9</button>
            </div>
            <div className="row">
              <button id="four" onClick={() => {this.showInput("4")}}>4</button>
              <button id="five" onClick={() => {this.showInput("5")}}>5</button>
              <button id="six" onClick={() => {this.showInput("6")}}>6</button>
            </div>
            <div className="row">
              <button id="one" onClick={() => {this.showInput("1")}}>1</button>
              <button id="two" onClick={() => {this.showInput("2")}}>2</button>
              <button id="three" onClick={() => {this.showInput("3")}}>3</button>
            </div>
            <div className="row last-row">
              <button id="zero" onClick={() => {this.showInput("0")}}>0</button>
              <button id="decimal">.</button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Calculator;