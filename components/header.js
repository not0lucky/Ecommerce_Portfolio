import React from 'react'
import styled from 'styled-components'
import {motion,AnimatePresence} from 'framer-motion'
import Link from 'next/link'
import {useState,useRef,useEffect} from 'react'
import {FaShoppingCart} from 'react-icons/fa'

const Nav =styled.nav`
    height:100px;
    width:100vw;
    color:black;
    display: flex;
    background-color:#f1f3f5;
    opacity:0.9;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    z-index: 1000;
    margin-bottom: 4rem;
    box-shadow: 0px 1px 10px #999;
`



const StyledLink = styled.a`
    padding: 0rem 2rem;
    color: black;
    font-size:17px;
    font-weight: 500;
    cursor : pointer;
    
`
const Title = styled(StyledLink)`
    font-size: 25px;
    font-weight: 700;
    cursor:pointer;
`

const Links = styled.div`
    display: flex;
    justify-content: space-around;
`



function Header() {
    
  return (
    <AnimatePresence>
    <Nav >
        <Title as={motion.a} whileHover={{scale:1.05}} whileTap={{scale:0.9}}>
            <Link href="/">
                <Title>MyStore</Title>
            </Link>
        </Title>
        <Links>
            <StyledLink as={motion.a} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
              <Link href="/">
                    <StyledLink >Home</StyledLink>
                </Link>  
            </StyledLink>
                
            <StyledLink as={motion.a} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                <Link href='/#product-list'>
                    <StyledLink>Products</StyledLink>
                </Link> 
            </StyledLink>
               
            <StyledLink as={motion.a} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
               <Link href=''>
                    <StyledLink>Contact us</StyledLink>
                </Link> 
            </StyledLink>
                
            
        </Links>
        
    </Nav>
    </AnimatePresence>
  )
}

export default Header