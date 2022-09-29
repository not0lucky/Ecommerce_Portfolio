import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  amount: 0,
  totalPrice:0,
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
      //const index = state.cartItems.findIndex(p=>p.id === payload.id )
      if( !itemInCart){
        state.cartItems.push(payload)
        state.totalPrice = 0 
       for (var i = 0; i < state.cartItems.length; i++){
        state.totalPrice += state.cartItems[i].price * state.cartItems[i].quantity
      }
             
      }
      
    },
    del: (state,{payload}) => {
       state.cartItems = state.cartItems.filter(({id})=> id!=payload)
       state.totalPrice = 0 
       for (var i = 0; i < state.cartItems.length; i++){
        state.totalPrice += state.cartItems[i].price * state.cartItems[i].quantity
      }

    },
    clear:(state) =>{
        state.cartItems = [];
    },
    tot:(state)=>{
        
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { add, del, clear,tot } = cartSlice.actions

export default cartSlice.reducer