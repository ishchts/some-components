import React from "react";

const declOfNum = (n, titles) => {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

const Checkout = ({ data: { count, sumNumber, discount} }) => {
  return (
    <div className="checkoutOrder">
      <ul className="checkoutOrder__list">
        <li className="checkoutOrder__item">
          <span className="checkoutOrder__itemKey">
            <span className="js-countItem">{count} {declOfNum(count, ['товар', 'товара', 'товаров'])} </span>
            на сумму
              </span>
          <span className="checkoutOrder__itemValue js-basketSum">
            <span className="checkoutOrder__price">
              {/* { BX.util.number_format(discount > 0 ? sumNumber + discount : sumNumber, 2, '.', " ") + ' р' } */}
              {discount > 0 ? Number(sumNumber + discount).toFixed(2) : sumNumber.toFixed(2) }
            </span>
          </span>
        </li>
        {
          discount > 0 ?
            <li className="checkoutOrder__item checkoutOrder__item--discount">
              <span className="checkoutOrder__itemKey">Скидка</span>
              <span className="checkoutOrder__itemValue">
                <span className="checkoutOrder__oldPrice">
                  {/* {BX.util.number_format(discount, 2, '.', " ") + ' р'} */}
                  {discount.toFixed(2)}
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
          {sumNumber.toFixed(2)}
        </span>
      </div>
      <div className="checkoutOrder__warning">
      </div>
      <button className="checkoutOrder__button js-BtnBasketOK" type="submit">Оформить заказ</button>
    </div>
  )
}

export default Checkout;