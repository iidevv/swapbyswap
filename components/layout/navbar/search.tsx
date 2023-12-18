'use client'

import { searchItem } from '@/app/actions/item'
import React, { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'


const initialState = {
    search: ""
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" className="absolute h-full top-0 right-0 pl-1 pr-3">
            {pending ? (
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            )
                :
                (
                    <svg className="w-4 h-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                )}
        </button>
    )
}

const Search = () => {

    const formRef = useRef<HTMLFormElement | null>(null);

    const [state, formAction] = useFormState(searchItem, initialState);

    const items = state?.results;
    console.log(state?.message);

    return (
        <div className="relative">
            <form action={formAction} ref={formRef}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <input type="search" name="search" className="block w-full p-4 pr-10 text-sm text-gray-900 rounded-xl bg-grey-light focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." required />
                    <SubmitButton />
                </div>
            </form>
            {state?.message && (
                <div className="absolute z-50 bg-white w-full p-2 shadow-xl rounded-lg">
                    {state?.message}
                </div>
            )}
            {items && (
                <div className="absolute z-50 bg-white w-full p-2 shadow-xl rounded-lg">
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                <a className='flex gap-4 mt-2' href={`items/${item.id}`}>
                                    <img className='w-12 h-12 rounded-lg' src="https://swap-by-swap-storage.s3.us-west-1.amazonaws.com/gggsdf-alaxy-a54-5g.webp" alt="alt" />
                                    <div className="flex flex-col overflow-hidden">
                                        <span>{item.title}</span>
                                        <span className='font-light text-gray-400 text-md truncate'>{item.description}</span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Search