'use client'

import { createItem } from '@/app/actions/item'
import Heading from '@/components/layout/heading'
import React, { FormEvent, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    title: null,
    description: null,
    message: '',
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='mt-5 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center' type="submit" aria-disabled={pending}>
            Add
        </button>
    )
}

const Page = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const [state, formAction] = useFormState(createItem, initialState);

    // const formAction = async (formData: FormData) => {
    //     console.log(formData.get('category'));
    //     const res = await fetch('/api/items',);
    //     const data = await res.json();
    //     console.log(data);
    //     // if (formRef && formRef.current) formRef.current.reset();

    // }
    return (
        <div>
            <Heading title="Create new item" />
            <form className='w-full lg:w-1/2 flex flex-col items-start' action={formAction} ref={formRef}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <select name="category" className="bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[42px]">
                    <option value="for-swap">For Swap</option>
                    <option value="for-sale">For Sale</option>
                    <option value="wanted">Wanted</option>
                </select>

                <textarea name="description" placeholder='Description' className='bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required></textarea>

                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file-input">Upload image</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <SubmitButton />
                <p aria-live="polite" className="" role="status">
                    {state?.message}
                </p>
            </form>
        </div>
    )
}

export default Page