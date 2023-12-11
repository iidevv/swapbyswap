"use client"

import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Modal from 'react-modal';
import { GoogleSignInButton } from './auth/auth-buttons';
import { SigninForm } from './auth/signin-form';
import { SignupForm } from './auth/signup-form';
import Link from 'next/link';

const SigninButton = () => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <Link aria-label='My account' className='flex items-center p-1 rounded-lg transition-all hover:bg-grey-light' href="/account">
                {session.user.image && <img className='w-8 h-8 rounded-full mr-2' src={session.user.image} alt={`${session.user.name} - Avatar`} />}
                <span className='font-semibold'>{session.user.name}</span>
            </Link>
        )
    }
    return (
        <>
            <button onClick={() => setModalOpen(!modalIsOpen)}>Sign In</button>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={() => setModalOpen(false)}
                className="modal"
                overlayClassName="modal-overlay"
                bodyOpenClassName="overflow-hidden"
                contentLabel="Project"
                shouldCloseOnOverlayClick={true}
            >
                {isSignIn ? <SignupForm /> : <SigninForm />}
                <button onClick={() => { setIsSignIn(!isSignIn) }} className='underline mt-4 mx-auto'>{isSignIn ? "Sign in" : "Create an account"}</button>
                <GoogleSignInButton />
            </Modal>
        </>
    )
}

export default SigninButton