import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
    }
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  clearDisplay() {
    this.setState({display: 0});
  }



  render() {
    return (
      <div className="Calculator">

        <span id="display">{this.state.display}</span>

        <button id="add">+</button>
        <button id="subtract">-</button>
        <button id="multiply">x</button>
        <button id="divide">/</button>

        <button id="clear" onClick={this.clearDisplay}>C</button>
        <button id="decimal">.</button>
        <button id="equals">=</button>

        
        <button id="zero">0</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
      </div>
    );
  }
}

export default Calculator;