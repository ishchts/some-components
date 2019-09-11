/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import './index.scss';
import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';


// eslint-disable-next-line no-unused-vars
class UserForm extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: {
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        city: '',
        bio: '',
      },
    };
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  prevStep = () => {
    this.setState({ step: this.state.step - 1 });
  }

  handleChange = input => (e) => {
    this.setState({ data: { ...this.state.data, [input]: e.target.value } });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { step } = this.state;

    switch (step) {
      case 0:
        return (
          <FormUserDetails
            title="Enter User Details"
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ this.state.data }
          / >
        );
      case 1:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={this.state.data}
            title="Enter Personal Details"
          />
        );
      case 2:
        return (
          <Confirm
            title="Confirm"
            values={ this.state.data }
            nextStep={this.nextStep}
            prevStep={this.prevStep} />
        );
      default:
        return (
          <div>
            <h1>Success</h1>
          </div>
        );
    }
  }
}

export default UserForm;
