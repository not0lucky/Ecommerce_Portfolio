import React ,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { add } from '../../redux/cart'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {motion,AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import CartIcon from '../../components/cartBut'

export async function getServerSideProps(context){
    const id = context.params.id
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    return {
        props:{
            data
        }
    }
}

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

function Id({data}) {
    const [product,setProduct] = useState()
    const router = useRouter()
    const {id} = router.query
    console.log(data)
    const {title,price,description,category,image} = data
    const dispatch = useDispatch();
    const List = useSelector((state)=> state.cart.cartItems);
    let [quantity,setQuantity] = useState(1)
    let [total,setTotal] = useState(price)
    const AddItem = ({title,price,category,image}) =>{
        
    }

   /* useEffect(()=>{
        const loadProduct = async() =>{
            await fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>console.log(json))
            .then(json=>setProduct(json))
        }  
        loadProduct()  
        console.log('productsss',product)
    },[]) 

*/
/*
    const loadProduct = async() =>{
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
        console.log('product',data)
    }*/

    const DecremQuantity = () => {
      setQuantity(function(prevQuantity){
        if(prevQuantity > 1){
          setTotal(price * quantity)
          return (prevQuantity -= 1)
        }else{
          setTotal(price * quantity)
          return (prevQuantity = 1)
        }
      })
    }

    const IncremQuantity = () => {
      setQuantity(function(prevQuantity){
        setTotal(price * quantity)
        return(prevQuantity += 1)
      })
    }

  return (
    <AnimatePresence>
    <FullScreen as={motion.div} initial='initial' animate='animate' exit={{opacity:0}}>
        
       <Product>
        <Img as={motion.div} animate={{opacity:1}} initial={{opacity:0}}>
        <img as={motion.div}  variants={fadeInUpImg}  src={image} height='300'/>
        </Img>
        <ProductDetail>
            <Inner as={motion.div} variants={stagger}>
                <Link href='/#product-list'>
                    <GoBack as={motion.div} variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                      <p> Go to products</p>  
                    </GoBack>
                
                </Link>
                <Cat as={motion.div} variants={fadeInUp}>{category}</Cat>
            <Title as={motion.h1} variants={fadeInUp}>{title}</Title>
            <Details as={motion.p} variants={fadeInUp}>{description}</Details>
            <Price as={motion.p} variants={fadeInUp}>{price}$</Price>
            <Quant>
              <QuantBut onClick={()=>DecremQuantity()}>-</QuantBut>
              <p>{quantity}</p>
              <QuantBut onClick={()=>IncremQuantity()}>+</QuantBut>
            </Quant>
            <ButtonCart as={motion.button}  whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} variants={fadeInUp} onClick={()=>dispatch(add({title,price,id,image,category,quantity,total}))}>Add to cart</ButtonCart>
            
           
            </Inner>
            
       </ProductDetail>
       </Product>
       <Link href="/cart">
       <CartPlace>
              <CartIcon/>   
            </CartPlace>
       </Link>
       
    </FullScreen>
    </AnimatePresence>
  )
}

const FullScreen = styled.div`
height: 100vh;
`
const Product = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: space-between;
`

const Img = styled.div`
height: 100%;
width: 50%;
background: #ffffff;
display: flex;
align-items: center;
justify-content: center;
`

const Inner = styled.div`
width:480px;
position: relative;
`

const GoBack = styled.div`
cursor: pointer;
color: #282828;
text-decoration: none;
text-align: left;
position: absolute;
top: -124px;
left: 0;
&:hover{
    text-decoration: underline;
    font-weight: 600;
}
`
const Cat = styled.div`
font-size: 1rem;
color: #424550;
font-weight: 500;
text-align: left;
width: 100%;
margin-bottom: 32px;
`

const Title = styled.h1`
text-align: left;

`

const Details = styled.p`
color: #424550;
font-weight: 300;
text-align: left;

`
const Price = styled.p`
color: #282828;
font-weight: 700;
font-size: 1.4rem;
`
const Quant = styled.div`
display: flex;
align-items: center;
margin-bottom: 1.5rem;
gap: 30px;
`
const QuantBut = styled.button`
width: 40px;
height: 40px;
font-size: 20px;
border-radius: 10px;
border: 0.6px solid black;
`

const ButtonCart = styled.button`
cursor: pointer;
border: none;
border-radius: 8px;
height: 48px;
padding: 0 48px;
font-size: 0.875rem;
text-transform: uppercase;
font-weight: 500;
letter-spacing: 0.06rem;
background: #2d89fa;
color: #fff;
margin-right: 24px;
`

const ProductDetail = styled.div`
padding-top: 5rem;
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #dfdfdf;
`
const CartPlace = styled.div`
position: absolute;
bottom: 3rem;
right: 4rem;
`

export default Id


