import React from "react";
import classnames from 'classnames';
import _one from '../../images/basket/62-536x354.jpg';
import _two from '../../images/basket/542-536x354.jpg';
import _three from '../../images/basket/926-536x354.jpg';

const arImages = [_one, _two, _three];

const Item = ({ data, events = {} }) => {
	const { handleBlur, dec, inc, handleChange, removeItem } = events;
	const {
		DETAIL_PICTURE_SRC,
		FULL_PRICE, 
		ID,
		MEASURE_NAME,
		NAME,
		PROPERTY_CML2_ARTICLE_VALUE,
		PROPERTY_KRATNOST_UPAKOVKI_VALUE,
		QUANTITY,
		SUM, 
		AVAILABLE_QUANTITY,
		DETAIL_PAGE_URL, 
		DISCOUNT_PRICE,
		PROPS_ALL,

	} = data;
	const { QUANTITY_RS } = PROPS_ALL
	const buttonClass = classnames({
		'quantity__button': true,
		'quantity__button--minus': true,
		'js-quantity__button--minus': true,
		'disabled': (QUANTITY - 1) <= 0 ? true : false,
	})
	return (
		<article className="basket__item box js-basket__item" data-id={ID}>
		   <div className="box__container">
		      <div className="box__prewiev">
						<a href={DETAIL_PAGE_URL} className="box__figure">
		          <img 
							src={arImages[Math.floor(Math.random() * arImages.length)]}
							alt={NAME}
		          className="box__image" />
		         </a>
		      </div>
		      <div className="box__name">
						<a href={DETAIL_PAGE_URL} className="box__nameLink">
							{NAME}
		        </a>
		      </div>
					<span className="box__vendorCode">{PROPERTY_CML2_ARTICLE_VALUE}</span>
		      <div className="box__detail">
		         <ul className="box__presence">
		            <li className="box__presenceItem box__presenceItem--availability">
									В наличии: {AVAILABLE_QUANTITY < 0 ? 0 : AVAILABLE_QUANTITY} {MEASURE_NAME}										
		            </li>
		            <li className="box__presenceItem box__presenceItem--order">
									На заказ: {parseInt(QUANTITY_RS.VALUE, 10) > 0 ? parseInt(QUANTITY_RS.VALUE, 10) : 0} {MEASURE_NAME}												
		            </li>
		         </ul>
		         <div className="box__multiplicity">
		            <div className="box__multiplicityItem">
									<span className="box__multiplicityKey">Крат. упак</span>
									<span className="box__multiplicityValue">{PROPERTY_KRATNOST_UPAKOVKI_VALUE}</span>
		            </div>
		            <div className="box__multiplicityItem">
									<span className="box__multiplicityKey">Ед. изм</span>
									<span className="box__multiplicityValue">{MEASURE_NAME}</span>
		            </div>
		         </div>
		         <div className="box__cost">
								{
									DISCOUNT_PRICE > 0 ?
										<span className="box__oldPrice">
											{/* {BX.util.number_format(FULL_PRICE, 2, '.', " ") + ' р'} */}
											{FULL_PRICE}
										</span>	
											:
												null 
								}
								<span className="box__price">
									{
										// BX.util.number_format(DISCOUNT_PRICE > 0 ? FULL_PRICE - DISCOUNT_PRICE : FULL_PRICE, 2, '.', " ") + ' р'
										DISCOUNT_PRICE > 0 ? Number(FULL_PRICE - DISCOUNT_PRICE).toFixed(2) : Number(FULL_PRICE).toFixed(2)
									}
								</span>
		         </div>
		         <div className="box__quantity quantity">
							<button className={buttonClass} onClick={dec(ID, `QUANTITY_${ID}`)}></button>
							<input 
								type="number" 
								name={`QUANTITY_${ID}`} 
								className="quantity__input js-quantity__input" 
								value={QUANTITY} pattern="[0-9]*" min="1" max="999999999"
								tabIndex="0"
								onChange={handleChange(ID)}
								onBlur={handleBlur(ID)} />
		            <button className="
		               quantity__button 
		               quantity__button--plus 
		               js-quantity__button--plus
		               "
							onClick={inc(ID, `QUANTITY_${ID}`)}></button>
		         </div>
		         <div className="box__summ">
								{
									DISCOUNT_PRICE > 0 ?
										<span className="box__oldPrice">
											{
												// BX.util.number_format(FULL_PRICE, 2, '.', " ") + ' р'
												FULL_PRICE
											}
										</span>
										:
										null
								}
		            <span className="box__price">
									{SUM}
		            </span>
		         </div>
						<a href="javascript:void(0);" className="box__removeLink " data-id={ID} onClick={ removeItem(ID) }>Удалить</a>
		      </div>
		   </div>
		</article>
  )
}

export default Item;