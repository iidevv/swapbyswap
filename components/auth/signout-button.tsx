'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const SignoutButton = () => {
    return (
        <button className='text-red-600 underline hover:no-underline' onClick={() => signOut()}>Log Out</button>
    )
}

export default SignoutButton