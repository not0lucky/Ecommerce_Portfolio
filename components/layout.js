import React from 'react'
import styled from 'styled-components'
import ProductList from './productlist'

const StyledLayout = styled.div`

background-color: white;
display: flex;
flex-direction: column;
align-items: center;
height:100vh;

`

const ProductStyle = styled.p`
font-size:35px ;
font-weight: 600;
margin-top: 100px;
`

function Layout() {
  return (
    <StyledLayout>
        <ProductStyle>Products</ProductStyle>
        <ProductList/>
    </StyledLayout>
  )
}

export default Layout
