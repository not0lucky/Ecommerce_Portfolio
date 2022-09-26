import { createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify"


const initialState = {
  amount: 0,
  total:0,
  cartItems:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state,{payload}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const itemInCart = state.cartItems.find((item) => item.id === payload.id);
      const index = state.cartItems.findIndex(p=>p.id === payload.id )
      if( !itemInCart){
        state.cartItems.push(payload)
        state.total += payload.price
             
      }
      
    },
    del: (state,{payload}) => {
       state.cartItems = state.cartItems.filter(({id})=> id!=payload)
       state.total -= payload.price
    },
    clear:(state) =>{
        state.cartItems = [];
    },
    tot:(state)=>{
        return state.cartItems.length();
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { add, del, clear,tot } = cartSlice.actions

export default cartSlice.reducer