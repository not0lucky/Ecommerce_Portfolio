import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Modal from 'react-modal'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/skyblue';
import Link from 'next/link'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { useSelector,useDispatch } from 'react-redux'
import CartList from '../components/cartlist'
import Footer from '../components/footer'
import styled from 'styled-components'
import Id from './id/[id]'
import {motion,AnimatePresence,useCycle} from 'framer-motion'
import CartIcon from '../components/cartBut'
import Header from '../components/header'


const defaultEndpoint ='https://fakestoreapi.com/products'
Modal.setAppElement("#__next")

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

export default function Home() {
  const router = useRouter()
  const [list,setList] = useState([])
  const [products,setProducts] =useState([])
  const [slideProducts,setSlideProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isOpen,setisOpen] = useState(false)
  const [open, cycleOpen] = useCycle(false, true);
  const dispatch = useDispatch();
  const [catSelected,setCatSelected] = useState("electronics")


  console.log(products)
  useEffect(()=>{
    loadData()
    loadDataHero()
    loadCategories()
  },[])

  const loadData = async()=>{
    const res = await fetch(defaultEndpoint)
    const data = await res.json()
    setList(data)
    setProducts(data)
  }

  const loadDataHero = ()=>{
    fetch('https://fakestoreapi.com/products?limit=3')
    .then(res=>{return res.json()})
    .then(data=>{
      setSlideProducts(data)
    console.log(products)
    })
  }

  const loadCategories = () =>{
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(data=>{setCategories(data) ; console.log('cat',categories)})
  }

  const filterCat = (cat) =>{
    const result = products.filter((item)=> item.category === cat)
    setProducts(result)
  }

  return (
    <AnimatePresence>
      
    <motion.div  exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
      <Header/>
      <SpaceDiv></SpaceDiv>
      <HeroSection>
      <Splide aria-label="Products Slider" options={{type:'loop',perPage:1,autoplay:true}}>
          
            {slideProducts.map((item)=>{
              return(
                <SplideSlide key={item.id}>
                  <SlideItem >
                    <Img>
                    <img src={item.image} height='300'/>
                    </Img>
                  <ProductDetail>
                    <Inner>
                      <Cat>{item.category}</Cat>
                        <TitleS>{item.title}</TitleS>
                        <Details>{item.description}</Details>
                        <Price>{item.price}$</Price>
                        <Link href={`/id/${item.id}`}>
                        <ButtonCheckOut as={motion.button} whileHover={{scale:1.1}} whileTap={{scale:0.95}}>More Infos</ButtonCheckOut>
                        </Link>
                    </Inner>
                  </ProductDetail>
                </SlideItem>
                </SplideSlide>
                
              )
            })}
          
      </Splide>
      </HeroSection>
      
        <Link href="/cart">
         <CartPlace> 
        <CartIcon/>
         </CartPlace>
        </Link>  
 
          
      <StyledLayout>
        
        <ProductStyle>Categories</ProductStyle>
        <CategoryList>
          <CategoryOption as={motion.p} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} onClick={()=>setCatSelected('all')}>all</CategoryOption>
          {categories.map((cat)=>{
            return(
              <div key={cat.index}>
                <CategoryOption as={motion.p} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} onClick={()=>setCatSelected(cat)}>{cat}</CategoryOption>
              </div>
            )
          })}
        </CategoryList>
        <ProductStyle>Products</ProductStyle>

        <div> 

        <ProductList id="product-list" >
          {catSelected !='all' && products.filter((item)=>item.category === catSelected).map((values)=>{
            return(
              <div key={values.id}>
                <Link href={`/id/${values.id}`}>
              <ProductItem  key={values.id} exit={{opacity:0}} as={motion.div} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} layoutId={values.id}  onClick={()=>setisOpen(!isOpen)}>
                
                <img src={values.image} height='180px' width='180px'/>
                
                <Title>{values.title}</Title>
                <D1>
                  <Cate>{values.category}</Cate>
                  <p>{values.price}$</p>
                </D1>

            
            </ProductItem>            
             </Link>
              </div>
            )
          }) 
          } 
          {catSelected=='all' && products.map((values)=>{
            return(
              <div key={values.id}>
                <Link href={`/id/${values.id}`}>
              <ProductItem  key={values.id} exit={{opacity:0}} as={motion.div} whileHover={{scale:1.05}}  whileTap={{ scale: 0.95 }} layoutId={values.id}  onClick={()=>setisOpen(!isOpen)}>
                
                <img src={values.image} height='180px' width='180px'/>
                
                <Title>{values.title}</Title>
                <D1>
                  <Cate>{values.category}</Cate>
                  <p>{values.price}$</p>
                </D1>

            
            </ProductItem>            
             </Link>
              </div>
            )
          })}
          
          
        </ProductList>
        
        </div>
    </StyledLayout>
    </motion.div>
    </AnimatePresence>
  )
}

const HeroSection = styled.div`
    background-color: black;
    height:80vh;
    width: 100vw;
    position:relative;`

const Title = styled.p`
font-weight: 600;
font-size: 17px;

`
const SpaceDiv = styled.div`
height:6rem;

`
const CategoryList = styled.div`
display: flex;
gap: 10px;
justify-content: center;
align-items: center;
`

const CategoryOption = styled.p`
border: 1px solid black;
border-radius: 30px;
padding:10px 20px;
margin: 0 15px;
text-align: center;
cursor: pointer;

`

const SlideItem = styled.div`
color: white;
height: 80vh ;
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
const Inner = styled.div`
width:480px;
position: relative;
`
const TitleS = styled.h1`
text-align: left;
color: black;
`
const Cat = styled.div`
font-size: 1rem;
color: #424550;
font-weight: 500;
text-align: left;
width: 100%;
margin-bottom: 32px;
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
const ButtonCheckOut = styled.button`
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

const Cate = styled.p`

`
const CartPlace = styled.div`
position: fixed;
bottom: 2rem;
right: 1.5rem;
`
const Aside = styled.div`
background-color: white;
width: 20rem;
height: 80vh;
bottom: 3rem;
right: 3rem;
z-index: 100000;
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

const D1 = styled.div`
display: flex;
flex-direction: row;
position: absolute;
gap:130px ;
bottom:0;
color: #282828;
font-weight: 500;
margin: 0 11px;
`

const ProductItem = styled.div`
position: relative;
padding: 10px 20px;
cursor: pointer;
background-color: #ffffff;
height: 390px;
width: 330px;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
`

const ProductList=styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto;
align-items: center;
justify-items:center;
gap: 80px 100px;
position: relative;
margin-bottom: 5rem;
`

const StyledLayout = styled.div`

background-color: #f1f3f5;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
max-width: 100vw;
margin: 0 auto;
`

const ProductStyle = styled.p`


font-size:35px ;
font-weight: 600;
margin-top: 100px;
`
