import React from "react";

const declOfNum = (n, titles) => {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

const Checkout = ({ data: { count, sumNumber, discount} }) => {
  return (
    <div className="checkoutOrder">
      <div className="checkoutOrder__container">
        <div className="checkoutOrder__item">
          <ul className="checkoutOrder__list">
            <li className="checkoutOrder__listItem">
              <span className="checkoutOrder__listKey">
                <span className="js-countItem">{count} {declOfNum(count, ['товар', 'товара', 'товаров'])} </span>
                на сумму
									</span>
              <span className="checkoutOrder__listValue js-basketSum">
                <span className="checkoutOrder__price">
                  {/* { BX.util.number_format(discount > 0 ? sumNumber + discount : sumNumber, 2, '.', " ") + ' р' } */}
                  { discount > 0 ? sumNumber + discount : sumNumber }
                </span>
              </span>
            </li>
            {
              discount > 0 ?
                <li className="checkoutOrder__listItem checkoutOrder__listItem--discount">
                  <span className="checkoutOrder__listKey">Скидка</span>
                  <span className="checkoutOrder__listValue">
                    <span className="checkoutOrder__oldPrice">
                      {/* {BX.util.number_format(discount, 2, '.', " ") + ' р'} */}
                      {discount}
                    </span>
                  </span>
                </li>
                : null
            }
          </ul>
          <div className="checkoutOrder__total">
            <span className="checkoutOrder__totalText">К оплате:</span>
            <span className="checkoutOrder__totalPrice js-basketSumResult">
              {/* {BX.util.number_format(sumNumber, 2, '.', " ") + ' р'} */}
              {sumNumber}
            </span>
          </div>
          <div className="checkoutOrder__warning">
          </div>
          <button className="checkoutOrder__button js-BtnBasketOK" type="submit">Оформить заказ</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout;