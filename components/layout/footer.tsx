import React from 'react'
import Container from './container'

const Footer = () => {
    const date = new Date();
    return (
        <footer className='bg-grey-dark text-white py-6 mt-auto'>
            <Container>
                <p className='text-center'>&copy; {date.getFullYear()}. SwapBySwap Inc.</p>
            </Container>
        </footer>
    )
}

export default Footer