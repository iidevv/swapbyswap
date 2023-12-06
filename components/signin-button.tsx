"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SigninButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="">
                <span>{session.user.name}</span>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
    return (
        <button onClick={() => signIn()}>Sign In</button>
    )
}

export default SigninButton