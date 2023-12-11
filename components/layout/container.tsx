import React, { ReactNode } from 'react'

type Container = {
    children: ReactNode,
    className?: string
}

const Container = ({ children, className = "" }: Container) => {
    return (
        <div className={`container mx-auto px-2 ${className}`}>{children}</div>
    )
}

export default Container