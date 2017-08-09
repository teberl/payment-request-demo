/* global PaymentRequest */
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: 'Shiny Moonstone',
      tips: 0.2,
      shipping: 9999.99,
      amount: 2.99
    };
    this.handlePaymentAction = this.handlePaymentAction.bind(this);
  }

  handlePaymentAction() {
    if (window.PaymentRequest) {
      // Price calculation will be not handled from the payment api
      const tipAmount = (this.state.amount + this.state.shipping) * this.state.tips;
      const totalAmount = tipAmount + this.state.shipping + this.state.amount;

      // A couple of example payment networks
      const methodData = [{ 
        supportedMethods: ['visa', 'discover']
      }];
      // Purchase details
      const details = { 
        displayItems: [{
          label: `${this.state.item} (in a box with giftcard)`,
          amount: { currency: 'EUR', value: this.state.amount }
        }, {
          label: '20% tips and Shipping',
          amount: { currency: 'EUR', value:  (this.state.shipping + tipAmount).toFixed(2) }
        }],
        total: { 
          label: 'Grand total', 
          amount: { currency: 'EUR', value: totalAmount.toFixed(2) } 
        },
        shippingOptions: [{
          id: 'spaceShip',
          label: 'Space-Ship special delivery',
          amount: { currency: 'EUR', value: this.state.shipping.toFixed(2) } ,
          seleceted: true
        }]
      };
      // Options
      const options = { requestShipping: true };

      const request = new PaymentRequest(methodData, details, options)
      request
        // Show a native Payment Request UI and handle the result
        .show()
        // Process the payment and let the ui respond to it
        .then(function(paymentInfo) {
          setTimeout(() => console.log(paymentInfo), 1000)
          return Promise.resolve();
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      // Use your legacy checkout form...
      console.info('Use your legacy checkout form...');
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Payment Request Api</h2>
        </div>
        {window.PaymentRequest 
          ? (<button className="button" onClick={this.handlePaymentAction}>Payme Now!</button>)
          : (<p className="App-intro">Payment Web Api  <code>PaymentRequest</code> is not supported in this browser</p>) 
        }
      </div>
    );
  }
}

export default App;
