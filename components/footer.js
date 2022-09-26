import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.div`
background-color: black;
color: white;
height: 40vh;
text-align: center;
`

function Footer() {
  return (
    <FooterStyle>
        <h1>Footer</h1>
    </FooterStyle>
  )
}

export default Footer