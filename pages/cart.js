import React from 'react'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import Link from 'next/link';
import {clear,del} from '../redux/cart';
import {motion,AnimatePresence} from 'framer-motion'

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

const fadeInUpImg = {
    initial: {
      x: 200,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing
      }
    }
  };


function CartPage() {
    const List = useSelector((state)=> state.cart.cartItems);
    const Total = useSelector((state)=> state.cart.totalPrice)
    const dispatch = useDispatch()
    const style = {color:'#000000', fontSize:'2em'}
    console.log(List)
  return (
    <AnimatePresence>
    <CartPageStyle as={motion.div} initial='initial' animate='animate' exit={{opacity:0}}>
        {List.length && <Link href='/'>
                    <GoBack as={motion.div} whileHover={{scale:1.05}} whileTap={{ scale: 0.95 }} >
                      <p> Go to products</p>  
                    </GoBack>
                </Link>}
        {List.length && <Tit>Products in cart:</Tit>}

        {List.length <1 && 
        <NoItemCart>
        <Tit>No items on cart</Tit>
        <Link href='/'>
            <LinkNoItem as={motion.p} whileHover={{scale:1.05}} whileTap={{ scale: 0.95 }}> Go to Products List</LinkNoItem>  
        </Link>  
        </NoItemCart>
        
        }
        <div>
            {List.length && <Titles>
                <ItemH1>Product</ItemH1>
                <ItemH1>Title</ItemH1>
                <ItemH1>Price</ItemH1>
                <ItemH1>Category</ItemH1>
                <ItemH1>Quantity</ItemH1>
                <ItemH1>Total</ItemH1>
            </Titles>}
         {List.map((item)=>{
        return(
            
            <CartItem key={item.id} as={motion.div} whileHover={{scale:1.05}} >
                <ItemImg>
                 <img src={item.image} height='100' width='100' />   
                </ItemImg>
                <div>
                  <Link href={`/id/${item.id}`}>
                  <ItemH1 as={motion.h1} whileTap={{ scale: 0.95 }} exit={{opacity:0}}>{item.title}</ItemH1>
                  </Link>
                </div>
                   
                 <ItemP>${item.price}</ItemP>  
                  <ItemP>{item.category}</ItemP>
                  <ItemP>{item.quantity}</ItemP>
                  <ItemP>{(item.price * item.quantity).toFixed(2)}$</ItemP>
                  <RemoveButton as={motion.button} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} onClick={()=>dispatch(del(item.id,item.price))}>
                    Remove
                  </RemoveButton>
            </CartItem>
        )
    })}   

    
        </div>
        

   { List.length >0 && 
   <ClearButtonPosition>
    <P>Total Price: ${Total}</P>
    <ClearButton onClick={()=>dispatch(clear())} as={motion.button} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} >Clear</ClearButton>
    </ClearButtonPosition>
    }
    </CartPageStyle>
    </AnimatePresence>
  )
}

const CartPageStyle = styled.div`
padding-top: 4rem;
padding-bottom: 5rem;
width: 100%;
background-color: #f1f3f5;
color: white;
display:flex;
flex-direction: column;
align-items: center;
position: relative;
`
const Tit = styled.h1`
color: black;
`

const ItemH1 = styled.h1`
font-size: 20px;
justify-self:center;
`
const ItemP = styled.p`
justify-self: center;
`
const ItemPD = styled.p`
align-items: center;
justify-self: center;
display: flex;
gap: 25px;
`
const ItemImg = styled.div`
justify-self: center;
`
const But = styled.button`
border-radius: 10px;
cursor: pointer;
width:25px;
height: 30px;
border: 0.5px solid black;

`

const NoItemCart = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position :absolute;
width: fit-content;
height: fit-content;
margin: 180px auto;
`
const LinkNoItem = styled.p`
color: #282828;
font-size: 18px;
&:hover{
    text-decoration: underline;
    font-weight: 600;
}
`

const RemoveButton = styled.button`
cursor: pointer;
border: none;
border-radius: 8px;
height: 48px;
justify-self:center;
padding: 0 28px;
font-size: 0.875rem;
text-transform: uppercase;
font-weight: 500;
letter-spacing: 0.06rem;
background: #d00000;
color: #fff;
`
const ClearButtonPosition = styled.div`
display: grid;
align-items: center;
justify-content: center;
`

const ClearButton = styled.button`
cursor: pointer;
border: none;
border-radius: 8px;
height: 48px;
padding: 0 48px;
font-size: 0.875rem;
text-transform: uppercase;
font-weight: 500;
background: #2d89fa;
color: #fff;
margin-right: 24px;
position: absolute;
bottom: 3rem;
`
const P = styled.p`
color:black;
font-size: 20px;
font-weight: 500;
text-align:center;
margin-bottom: 4rem ;
`
const Titles = styled.div`
margin-bottom:2rem;
border-bottom: 1px solid black;
padding: 20px 20px;
display: grid;
align-items: center;
grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
column-gap: 1rem;
color: black;
`

const CartItem = styled.div`
cursor: pointer;
margin-bottom:5rem;
padding: 30px 20px;
display: grid;
align-items: center;
grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
column-gap: 0.5rem;
justify-content: center;
background-color: white;
border-radius: 20px;
color: black;
width: 75vw;
`
const GoBack = styled.div`
cursor: pointer;
color: black;
text-decoration: none;
text-align: left;
font-weight: 500;
position: absolute;
top: 20px;
left: 180px;
&:hover{
    text-decoration: underline;
}
`

export default CartPage