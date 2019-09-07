import React from "react";

const Header = ({ events: { clearBasket}}) => {
  return (
    <div className="basket__head">
      <span className="basket__title">Состав заказа:</span>
      <div className="basket__row">
        <span className="basket__colName">Наименование</span>
        <span className="basket__colPrice">Цена</span>
        <span className="basket__colNumber">Колличество</span>
        <span className="basket__colSumm">Сумма</span>
      </div>
      <button type="button" onClick={() => clearBasket()} className="basket__clearBtn clearBasket js-clearBasket" name="button">
        Очистить корзину
        <span className="clearBasket__close"></span>
      </button>
    </div>
  )
}

export default Header;