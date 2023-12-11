import React from 'react'
import Logo from './logo';
import Search from './search';
import Controls from './controls';
import Container from '../container';
import Menu from './menu';

const Navbar = () => {
    return (
        <header className='shadow-grey-light shadow-sm sticky top-0 z-50 bg-white'>
            <Container className="flex items-center justify-between p-2 gap-4">
                <Logo />
                <Search />
                <Menu />
                <Controls />
            </Container>
        </header>
    )
}

export default Navbar