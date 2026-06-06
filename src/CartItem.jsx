import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQty, decreaseQty, clearCart } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  // convert "$15" → 15
  const getPrice = (cost) => parseFloat(cost.replace('$', ''));

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + getPrice(item.cost) * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>Price: {item.cost}</p>

                <div>
                  <button
                    onClick={() => dispatch(decreaseQty(item.name))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.name))}
                  >
                    +
                  </button>
                </div>

                <p>
                  Total: ${getPrice(item.cost) * item.quantity}
                </p>

                <button onClick={() => dispatch(removeItem(item.name))}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ${calculateTotal().toFixed(2)}</h3>

          <button onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>

          <button onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
}

export default CartItem;