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

	removeItem = (id) => e => {

		const { items, badge } = this.state;
		const itemPrice = items[id].PRICE;
		const newItems = Object.keys(items).reduce((acc, el) => {
			if (el === id) {
				return {...acc}
			}
			return { ...acc, [el]: items[el] }
		}, {});

		this.setState({
			items: newItems,
			isEmpty: Object.keys(newItems).length === 0 ? true : false,
			badge: {
				count: Object.keys(newItems).length,
				sumNumber: Math.floor(badge.sumNumber - itemPrice),
				sum: Math.floor(badge.sumNumber - itemPrice),
			}
		})
	}

	clearBasket = () => {

		const { items } = this.state;

		const self = this;
		self.setState({ isEmpty: true, items: {} })

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
						<CSSTransition key={items[el].ID} classNames="simple-item" timeout={1000}>
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
