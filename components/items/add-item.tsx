'use client'
import { createItem } from '@/app/actions/item'
import Heading from '@/components/layout/heading'
import React, { useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    title: null,
    description: null,
    category: '',
    image: null,
    message: '',
    price: 0,
    priceUpgrade: 0,
    priceDowngrade: 0,
    latitude: null,
    longitude: null
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='mt-5 px-5 py-2.5 text-sm font-medium disabled:opacity-70 text-white bg-primary hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-center uppercase' type="submit" aria-disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    )
}
const AddItem = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const [state, formAction] = useFormState(createItem, initialState);

    const [locationState, setLocationState] = useState({ status: 0, message: '' });

    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    const getLocation = () => {
        if (!navigator.geolocation) {
            setLocationState({ status: 0, message: 'Geolocation is not supported by your browser' });
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationState({ status: 1, message: 'Location set!' })
            }, () => {
                setLocationState({ status: 0, message: 'Unable to retrieve your location' });
            });
        }
    };

    return (
        <form className='w-full lg:w-1/2 flex flex-col items-start' action={formAction} ref={formRef}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                required
                className="bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <select name="category" className="bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[42px]">
                <option value="for-swap">For Swap</option>
                <option value="for-sale">For Sale</option>
                <option value="wanted">Wanted</option>
            </select>

            <textarea name="description" placeholder='Description' className='bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required></textarea>

            <label className='w-full'>
                <span className="text-sm">Approx. price*</span>
                <input
                    type="number"
                    name="price"
                    placeholder="$100"
                    required
                    className="bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </label>
            <div className="flex w-full gap-2">
                <label className='w-full'>
                    <span className="text-sm">Upgrade Surcharge</span>
                    <input
                        type="number"
                        name="price-upgrade"
                        placeholder="$10"
                        required
                        className="bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </label>
                <label className='w-full'>
                    <span className="text-sm">Downgrade Refund</span>
                    <input
                        type="number"
                        name="price-downgrade"
                        placeholder="$5"
                        required
                        className="bg-white border border-gray-400 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </label>
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file-input">Upload image</label>

            <input name="image" type="file" required />
            {locationState.status === 0 && (
                <button className='underline py-1' type="button" onClick={getLocation}>Get Location</button>
            )}
            <p>{locationState.message}</p>
            <input type="hidden" name="latitude" value={location.latitude || ''} />
            <input type="hidden" name="longitude" value={location.longitude || ''} />
            <SubmitButton />
            <p aria-live="polite" className="" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export default AddItem