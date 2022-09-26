import React from 'react'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'

function CartList() {
    const items = useSelector((state)=> state.cart.cartItems)
    
  return (
    <div>
        <h1>Products in cart:</h1>
        {items.map((item)=>{
            <div key={item.id}>
                <p>{item.title}</p>
            </div>
        })}
    </div>
  )
}

const List = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default CartList