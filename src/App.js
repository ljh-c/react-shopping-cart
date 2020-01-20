import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const item = localStorage.getItem('user_cart');
    return item ? JSON.parse(item) : [];
	});

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = itemId => {
		setCart(cart.filter(item => item.id !== itemId));
	};

	useEffect(() => {
		const handleLeavePage = event => {
			event.preventDefault();

			localStorage.setItem('user_cart', JSON.stringify(cart));
		};

		// save cart to storage on page refresh or leave
		window.addEventListener('beforeunload', handleLeavePage);

		return () => {
			window.removeEventListener('beforeunload', handleLeavePage);
		};
	}, [cart]);

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
			<CartContext.Provider value={{cart, removeItem}}>

				<Navigation />

			{/* Routes */}
				<Route
					exact path="/"
					component={Products}
				/>

				<Route
					path="/cart"
					component={ShoppingCart}
				/>

			</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
