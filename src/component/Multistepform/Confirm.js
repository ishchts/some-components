import React from 'react';

const Confirm = ({
 values, title, prevStep = f => f, nextStep = f => f 
}) => {
  return (
    <form className="userFrom">
      <h1 className="userFrom__title">{title}</h1>
      <ul className="confirmList">
        {
          Object.keys(values).map((el, i) => (
            <li key={i} className="confirmItem">
              <p className="confirmItem__caption">
                {el}
              </p>
              <p className="confirmItem__value">
                {values[el]}
              </p>
            </li>
          ))
        }
      </ul>
      <div className="userFrom__buttons">
        <button className="userFrom__button button button--second" onClick={prevStep}>back</button>
        <button className="userFrom__button button button--primary" onClick={nextStep}>confirm</button>
      </div>
    </form>
  );
};

export default Confirm;
