import React from "react";
import {useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import  {clearCart} from "../features/cart/cartSlice"
import  {openModal} from "../features/modal/modalSlice"

const CartContainer = () => {
    const dispatch=useDispatch()
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart"> is Currently Empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
      </header>
      <div>
        {cartItems.map((cart) => (
          <CartItem key={`cart-Items Id ${cart.id}`} {...cart} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span> ${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={()=>dispatch(clearCart())}>Clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
