import React from 'react';

const FormPersonalDetails = ({
  nextStep = f => f, prevStep = f => f, handleChange = f => f, values = '', title,
}) => {
  const { occupation, city, bio } = values;
  return (
    <form className="userFrom userFrom--details">
      <h1 className="userFrom__title">{title}</h1>
      <div className="userFrom__content">
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="text"
              onChange={handleChange('occupation')}
              value={occupation}
              placeholder="Occupation" />
            <span className="textField__legend">Occupation</span>
          </label>
        </fieldset>
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="text"
              onChange={handleChange('city')}
              value={city}
              placeholder="City" />
            <span className="textField__legend">City</span>
          </label>
        </fieldset>
        <fieldset className="textField">
          <label className="textField__label">
            <input
              className="textField__input"
              type="email"
              onChange={handleChange('bio')}
              value={bio}
              placeholder="Bio" />
            <span className="textField__legend">Bio</span>
          </label>
        </fieldset>
        <div className="userFrom__buttons">
          <button className="userFrom__button button button--second" onClick={prevStep}>back</button>
          <button className="userFrom__button button button--primary" onClick={nextStep}>continue</button>
        </div>
      </div>
    </form>
  );
};

export default FormPersonalDetails;
