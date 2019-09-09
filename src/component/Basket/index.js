import React from "react";
// import signedParams from './signedParams';
import './style.scss';
import Item from './Item';
import Header from './Header';
import Checkout from './Checkout';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import data from './../../data/basket';


class BasketApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	removeItem = (id) => {
		const self = this;

		const { items, badge } = this.state;
		const itemPrice = items[id].PRICE;
		delete items[id];

		this.setState({
			items,
			isEmpty: Object.keys(items).length === 0 ? true : false,
			badge: {
				count: Object.keys(items).length,
				sumNumber: Math.floor(badge.sumNumber - itemPrice),
				sum: Math.floor(badge.sumNumber - itemPrice),
			}
		// 			badge: {
		// 				count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
		// 				sum: response.BASKET_DATA.allSum_FORMATED,
		// 				sumNumber: response.BASKET_DATA.allSum,
		// 			},
		})
		// const prepareData = [
		// 	{ name: 'via_ajax', value: 'Y' },
		// 	{ name: 'SITE_ID', value: "s1" },
		// 	{ name: 'sessid', value: BX.bitrix_sessid() },
		// 	{ name: 'signedParamsString', value: signedParams },
		// 	{ name: 'basketAction', value: 'recalculateAjax' },
		// 	{ name: `basket[DELETE_${id}]`, value: 'Y' },
		// ];

		// $.ajax({
		// 	type: 'POST',
		// 	data: prepareData,
		// 	url: '/bitrix/components/bitrix/sale.basket.basket/ajax.php',
		// 	success: function (response) {
		// 		self.setState({
		// 			items: { ...response.BASKET_DATA.GRID.ROWS },
		// 			isEmpty: response.BASKET_DATA.EMPTY_BASKET,
		// 			badge: {
		// 				count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
		// 				sum: response.BASKET_DATA.allSum_FORMATED,
		// 				sumNumber: response.BASKET_DATA.allSum,
		// 			},
		// 		});
		// 	}
		// })

	}

	clearBasket = () => {
		// const prepareData = [
		// 	{ name: 'via_ajax', value: 'Y' },
		// 	{ name: 'SITE_ID', value: "s1" },
		// 	{ name: 'sessid', value: BX.bitrix_sessid() },
		// 	{ name: 'signedParamsString', value: signedParams },
		// 	{ name: 'basketAction', value: 'recalculateAjax' },
		// ];
		const { items } = this.state;
		// const newData = Object.keys(items).reduce((acc, el) => {
		// 	return [...acc, { name: `basket[DELETE_${items[el].ID}]`, value: 'Y' }];
		// }, prepareData);

		const self = this;
		self.setState({ isEmpty: true })

		// $.ajax({
		// 	type: 'POST',
		// 	data: newData,
		// 	url: '/bitrix/components/bitrix/sale.basket.basket/ajax.php',
		// 	success: function (response) {
		// 		self.setState({ isEmpty: response.BASKET_DATA.EMPTY_BASKET })
		// 	}
		// })

	}

	handleChange = id => e => {
		this.setState({ items: { ...this.state.items, [id]: { ...this.state.items[id], QUANTITY: e.target.value } } });
	}

	handleBlur = id => e => {
		const self = this;
		// const prepareData = [
		// 	{ name: 'via_ajax', value: 'Y' },
		// 	{ name: 'SITE_ID', value: "s1" },
		// 	{ name: 'sessid', value: BX.bitrix_sessid() },
		// 	{ name: 'signedParamsString', value: signedParams },
		// 	{ name: 'basketAction', value: 'recalculateAjax' },
		// 	{ name: 'basket[' + e.target.name + ']', value: e.target.value },
		// ];

		const minValue = e.target.value === '' ? 1 : false;

		if (minValue) {
			this.setState({ items: { ...this.state.items, [id]: { ...this.state.items[id], QUANTITY: minValue } } })
		}

		// $.ajax({
		// 	type: 'post',
		// 	data: prepareData,
		// 	url: '/bitrix/components/bitrix/sale.basket.basket/ajax.php',
		// 	success: function (response) {

		// 		self.setState({
		// 			items: { ...response.BASKET_DATA.GRID.ROWS },
		// 			badge: {
		// 				...self.state.badge,
		// 				count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
		// 				sum: response.BASKET_DATA.allSum_FORMATED,
		// 				sumNumber: response.BASKET_DATA.allSum,
		// 				discount: response.BASKET_DATA.DISCOUNT_PRICE_ALL,
		// 			}
		// 		})
		// 	}
		// });

	}

	updateValue = (target, name, newCount) => {
		const self = this;

		// const prepareData = [
		// 	{ name: 'via_ajax', value: 'Y' },
		// 	{ name: 'SITE_ID', value: this.siteId },
		// 	{ name: 'sessid', value: BX.bitrix_sessid() },
		// 	{ name: 'signedParamsString', value: signedParams },
		// 	{ name: 'basketAction', value: 'recalculateAjax' },
		// 	{ name: 'basket[' + name + ']', value: newCount }
		// ];

		// $.ajax({
		// 	type: 'post',
		// 	data: prepareData,
		// 	url: '/bitrix/components/bitrix/sale.basket.basket/ajax.php',
		// 	success: function (response) {
		// 		self.setState({
		// 			items: { ...response.BASKET_DATA.GRID.ROWS },
		// 			badge: {
		// 				...self.state.badge, count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
		// 				sum: response.BASKET_DATA.allSum_FORMATED,
		// 				sumNumber: response.BASKET_DATA.allSum,
		// 				discount: response.BASKET_DATA.DISCOUNT_PRICE_ALL,
		// 			}
		// 		});
		// 	}
		// });
	}

	dec = (id, name) => e => {
		const { QUANTITY: count } = this.state.items[id];
		const newCount = count - 1 <= 0 ? 1 : count - 1;

		this.setState({ items: { ...this.state.items, [id]: { ...this.state.items[id], QUANTITY: newCount } } });

		const target = e.target;
		// this.updateValue(target, name, newCount);
	}

	inc = (id, name) => e => {
		const { QUANTITY: count } = this.state.items[id];
		const newCount = Number(count) + 1;

		this.setState({ items: { ...this.state.items, [id]: { ...this.state.items[id], QUANTITY: newCount } } });

		const target = e.target;
		this.updateValue(target, name, newCount);

	}

	componentDidMount() {
		const self = this;
		// const postData = {
		// 	'via_ajax': 'Y',
		// 	'sessid': BX.bitrix_sessid(),
		// 	'site_id': BX.message('SITE_ID'),
		// 	'basketAction': 'recalculateAjax',
		// 	'signedParamsString': signedParams
		// };

		// BX.ajax({
		// 	url: '/bitrix/components/bitrix/sale.basket.basket/ajax.php',
		// 	method: 'POST',
		// 	data: postData,
		// 	dataType: 'json',
		// 	onsuccess: function (response) {
		// 		self.setState({
		// 			items: response.BASKET_DATA.GRID.ROWS,
		// 			badge: {
		// 				count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
		// 				sum: response.BASKET_DATA.allSum_FORMATED,
		// 				sumNumber: response.BASKET_DATA.allSum,
		// 				discount: response.BASKET_DATA.DISCOUNT_PRICE_ALL,
		// 			},
		// 			isEmpty: response.BASKET_DATA.EMPTY_BASKET
		// 		})
		// 	}
		// });
		const response = data;
		self.setState({
			items: response.BASKET_DATA.GRID.ROWS,
			badge: {
				count: response.BASKET_DATA.BASKET_ITEMS_COUNT,
				sum: response.BASKET_DATA.allSum_FORMATED,
				sumNumber: response.BASKET_DATA.allSum,
				discount: response.BASKET_DATA.DISCOUNT_PRICE_ALL,
			},
			isEmpty: response.BASKET_DATA.EMPTY_BASKET
		})
	}

	renderItems = () => {
		const { items } = this.state;
		return (
			<TransitionGroup
				component={null}
				className="simple-list"
			>
				{
					Object.keys(items).map((el) => (
						<CSSTransition key={items[el].ID} classNames="simple-item" timeout={5000}>
							<Item key={items[el].ID} data={items[el]}
								events={
									{
										dec: this.dec,
										inc: this.inc,
										handleBlur: this.handleBlur,
										handleChange: this.handleChange,
										removeItem: this.removeItem,
									}} />
						</CSSTransition>
					))
				}
			</TransitionGroup>
		)
	}

	render() {
		if (Object.keys(this.state).length === 0) {
			return (
				<div>loader...</div>
			)
		}
		const { isEmpty } = this.state;

		if (isEmpty) {
			return (
				<div className="baketEmpty">
					<span className="baketEmpty__text">
						Ваша корзина пустра.
					</span>
				</div>
			)
		}
		
		return (
			<form action="/personal/order/make/" onSubmit={e => e.preventDefault()}>
				<section className="basket">
					<div className="basket__container">
						<Header events={{ clearBasket: this.clearBasket }} />
						<div className="basket__list">
							{this.renderItems()}
						</div>
						<Checkout data={this.state.badge} />
					</div>
				</section>
			</form>
		)

	}
}
export default BasketApp;
