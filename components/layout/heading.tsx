import React from 'react'

type HeadingProps = {
    title: string
}

const Heading = ({ title }: HeadingProps) => {
    return (
        <div className="border-b mb-4 pb-4">
            <h1 className="text-2xl">{title}</h1>
        </div>
    )
}

export default Heading