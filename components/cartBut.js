import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import styled from 'styled-components'
import {FaShoppingCart} from 'react-icons/fa'
import {motion,AnimatePresence} from 'framer-motion'

function CartIcon() {
  const count = useSelector((state) => state.cart.cartItems.length)  
    const style = {color:'#000000', fontSize:'3em'}
  return (
    <CartIc as={motion.button} whileHover={{scale:1.1}} whileTap={{scale:0.95}}>
        <FaShoppingCart style={style} />
        <Num>{count}</Num>
    </CartIc>
  )
}

const CartIc = styled.button`
height: 80px;
width: 80px;
border-radius: 50%;
display: flex;
justify-content:center;
align-items: center;
position: relative;
border: none;
cursor: pointer;
background-color: transparent;
`
const Num = styled.span`
position: absolute;
width: 1.6rem;
height:1.6rem;
font-size:.9rem;
border-radius: 50%;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
top: .4rem;
right: .3rem;
background-color: #2d89fa;
`

export default CartIcon