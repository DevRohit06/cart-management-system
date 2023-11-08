import { createSlice } from "@reduxjs/toolkit";
import { products } from "@/utils/products";

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  color: string;
  imageAlt: string;
  quantity: number;
}
interface Coupon {
  code: string;
  discount: number;
}

interface InitialStateType {
  cart: CartItem[];
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  discountedPrice: number;
}
const initialState: InitialStateType = {
  cart: [],
  items: products,
  totalQuantity: 0,
  totalPrice: 0,
  discountedPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    applyCode: (state, action) => {
      state.totalPrice =
        state.totalPrice - (state.totalPrice * action.payload[0].discount) / 100;
    },
    getCartTotal: (state, action?) => {
      let { totalQuantity, totalPrice, discountedPrice } = state.cart.reduce(
        (cartTotal: any, cartItem: any) => {
          const { quantity, price } = cartItem;
          const itemTotal = quantity * price;
          cartTotal.totalQuantity += quantity;
          cartTotal.totalPrice += itemTotal;
          return cartTotal;
        },
        {
          totalQuantity: 0,
          totalPrice: 0,
          discountedPrice: 0,
        }
      );
      state.totalQuantity = totalQuantity;
      state.totalPrice = parseInt(totalPrice.toFixed(2));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: any) => item.id !== action.payload.id
      );
    },
    increaseQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        if (item.quantity <= 1) {
          return { ...item, quantity: (item.quantity = 1) };
        }
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  getCartTotal,
  increaseQuantity,
  decreaseQuantity,
  applyCode,
} = cartSlice.actions;
export default cartSlice.reducer;
