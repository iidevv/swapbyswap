import React from 'react'
import Container from './container'

const Footer = () => {
    const date = new Date();
    return (
        <footer className='footer'>
            <Container>
                <p className='copyright'>&copy; {date.getFullYear()}. SwapBySwap Inc.</p>
            </Container>
        </footer>
    )
}

export default Footer