import React, { Component } from 'react';

const FormUserDetails = ({ nextStep = f => f, handleChange = f => f, values = '', title }) => {
  const { firstName, lastName, email } = values;
  return (
    <form className="userFrom userFrom--details">
      <h1 className="userFrom__title">{title}</h1>
      <div className="userFrom__content">
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="text"
              onChange={handleChange('firstName')}
              value={firstName}
              placeholder="First Name" />
            <span className="textField__legend">First Name</span>
          </label>
        </fieldset>
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="text"
              onChange={handleChange('lastName')}
              value={lastName}
              placeholder="Last Name" />
            <span className="textField__legend">Last Name</span>
          </label>
        </fieldset>
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="email"
              onChange={handleChange('email')}
              value={email}
              placeholder="Email" />
            <span className="textField__legend">Email</span>
          </label>
        </fieldset>
        <div className="userFrom__buttons">
          <button className="userFrom__button button button--primary" onClick={nextStep}>continue</button>
        </div>
      </div>
    </form>
  )
};

export default FormUserDetails;