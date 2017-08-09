/* global PaymentRequest */
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handlePaymentAction = this.handlePaymentAction.bind(this);
  }

  handlePaymentAction() {
    if (window.PaymentRequest) {
      // A couple of example payment networks (others exist too!)
      var methodData = [{supportedMethods: ['visa', 'mastercard']}];
      var details = { total: 
        { label: 'Something that costs money', 
          amount: {currency: 'EUR', value: '799.74'} }};
      // Show a native Payment Request UI and handle the result
      var request = new PaymentRequest(methodData, details)
      request
        .show()
        .then(function(uiResult) {
          // processPayment(uiResult);
        })
        .catch(function(error) {
          // handlePaymentError(error);
        });
    } else {
      console.error('PaymentRequest no supported');
      // Alas! Use your legacy checkout form...
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Payment Request Api</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handlePaymentAction}>Payme Now!</button>
      </div>
    );
  }
}

export default App;
