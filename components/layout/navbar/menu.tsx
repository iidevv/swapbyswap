import Link from 'next/link'
import React from 'react'

const Menu = () => {
    return (


        <nav>
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8">
                <li>
                    <a href="#" className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0">For Swap</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0">For Sale</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0">Wanted</a>
                </li>
            </ul>
        </nav>

    )
}

export default Menu