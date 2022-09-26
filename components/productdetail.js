import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'


function ProductDetail({image,title,price,description,category}) {
  return (
    <div>
      <Countainer>
        <Link href='/'>
        <p>Back</p>
        </Link>
        <img src={image} height='300' width='300'/>
        <Infos>
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            </Infos>
       </Countainer>
    </div>
  )
}

export default ProductDetail


const Countainer = styled.div`
background-color: white;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: auto;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
max-width: 70vw;
margin: 80px auto;

`

const Infos = styled.div`
display:flex;
flex-direction: column;

`