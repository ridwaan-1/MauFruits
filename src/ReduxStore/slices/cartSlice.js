import { createSlice } from "@reduxjs/toolkit"; 

const defaultState = {
    totalItems: 0,
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cart')) || defaultState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            state.totalItems += newItem.qty;
            state.totalPrice += newItem.sellingPrice * newItem.qty;
            if (existingItem) {
                existingItem.qty += newItem.qty;
            } else {
                state.items.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);
            if(state.items.length===1) {
                state.items = [];
                state.totalItems = 0;
                state.totalPrice = 0;
            } else {
                state.totalItems -= item.qty;
                state.totalPrice -= item.sellingPrice * item.qty;
                state.items = state.items.filter(item => item.id !== id);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateCart(state, action) {
            const { id, qty } = action.payload;
            state.items.forEach((element, index) => {
                if(element.id === id) {
                    state.totalItems -= (element.qty - qty);
                    state.totalPrice -= (element.sellingPrice * element.qty) - (element.sellingPrice * qty);
                    state.items[index] = { ...element, qty };
                    if (qty === 0) state.items.splice(index, 1);
                }
            }); 
            localStorage.setItem('cart', JSON.stringify(state));
        },
        emptyCart(state) {
            localStorage.removeItem('cart');
        }
    }
});

export const { addToCart, removeFromCart, updateCart, emptyCart } = cartSlice.actions;
export default cartSlice;
