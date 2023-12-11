import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link className="flex items-center" href='/'>
            <svg className='w-12 h-12 mr-4' width="182" height="180" viewBox="0 0 182 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_20_43)">
                    <circle cx="91" cy="91" r="91" fill="#009B5A" />
                    <path d="M91.0001 2.27502L51.0111 77.6947C47.4797 84.3549 52.3075 92.3792 59.846 92.3792H121.907C129.503 92.3792 134.326 100.514 130.681 107.178L91.0001 179.725" stroke="white" strokeWidth="15" strokeLinecap="square" />
                </g>
                <defs>
                    <clipPath id="clip0_20_43">
                        <rect width="182" height="180" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <span className='text-lg'>SwapBySwap</span>
        </Link>
    )
}

export default Logo