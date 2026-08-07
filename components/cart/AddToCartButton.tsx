"use client";

import { useCart } from "@/context/CartContext";
import "@/styles/cartbutton.css"
export default function AddToCart({ product }: any) {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="product-actions">
      {!cartItem ? (
        <button
          className="cart-btn"
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.name,
              image: product.image,
              price: product.price,
              stock: product.stock,
              quantity: 1,
            })
          }
        >
          Add To Cart
        </button>
      ) : (
        <div className="cart-quantity">
          <button
            className="qty-btn"
            onClick={() => decreaseQuantity(product.id)}
          >
            -
          </button>

          <span>{cartItem.quantity}</span>

          <button
            className="qty-btn"
            onClick={() => increaseQuantity(product.id)}
            disabled={cartItem.quantity >= product.stock}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
