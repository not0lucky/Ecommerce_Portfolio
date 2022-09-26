import React, {useState,useEffect} from 'react'
import Header from './header'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import heroimage from '../public/hero-image.jpg'
import {motion,AnimatePresence} from 'framer-motion'


const HeroSection = styled.div`
    background-color: black;
    height:80vh;
    width: 100vw;
    position:relative;
`
const ImageWrapper = styled.div`
z-index: -1000;
opacity: 0.6;
`
const HeroContent = styled.div`
top:26%;
position: relative;
display:flex;
flex-direction: column;
align-items:center;
`

const H1Style = styled.h1`
color: white;
font-size: 60px;
`

const PStyle = styled.p`
color: white;
margin-top: -20px;
font-size: 20px;
`

const ExpBut = styled.button`
cursor:pointer;
border-radius: 10px;
border-color: transparent;
background-color: black;
color: white;
margin-top: 30px;
font-size: 18px;
padding:16px 30px;

&:hover{
    background-color: white;
    color: black;
}
`




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

function Hero() {
  const [products,setProducts] =useState([])


  useEffect(()=>{
    loadData()
  },[])

  const loadDataHero = async()=>{
    const res = await fetch('https://fakestoreapi.com/products?limit=3')
    const data = await res.json()
    setProducts(data)
    console.log(products)
  }
  return (  
  <AnimatePresence>
    <HeroSection >
        <Header />
        <HeroContent >

            
        </HeroContent>
    </HeroSection>    
    </AnimatePresence>  
  )
}

export default Hero