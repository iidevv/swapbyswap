import React from 'react'

const Search = () => {
    return (
        <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-4 pr-10 text-sm text-gray-900 rounded-xl bg-grey-light focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." required />
                <button type="submit" className="absolute h-full top-0 right-0 pl-1 pr-3">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default Search