import React from 'react'
import SignoutButton from '../auth/signout-button'
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className="flex flex-col items-start">
            <ul className="mb-4">
                <li>
                    <Link className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0" href="/items/add">New swap</Link>
                </li>
            </ul>
            <SignoutButton />
        </div>
    )
}

export default Sidebar