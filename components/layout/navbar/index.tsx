import React from 'react'
import Logo from './logo';
import Search from './search';
import Controls from './controls';
import Container from '../container';

const Navbar = () => {
    return (
        <header className='header'>
            <Container className="flex items-center justify-between p-2 gap-4">
                <Logo />
                <Search />
                <Controls />
            </Container>
        </header>
    )
}

export default Navbar