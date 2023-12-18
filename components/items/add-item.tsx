'use client'
import { createItem } from '@/app/actions/item'
import Heading from '@/components/layout/heading'
import React, { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    title: null,
    description: null,
    category: '',
    image: null,
    message: '',
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='mt-5 px-5 py-2.5 text-sm font-medium disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center' type="submit" aria-disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    )
}
const AddItem = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const [state, formAction] = useFormState(createItem, initialState);

    return (
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

            <input name="image" type="file" required />
            <SubmitButton />
            <p aria-live="polite" className="" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export default AddItem