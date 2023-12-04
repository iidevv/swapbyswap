import React, { ReactNode } from 'react'

type Container = {
    children: ReactNode,
    className?: string
}

const Container = ({ children, className = "" }: Container) => {
    return (
        <div className={`sbs-container ${className}`}>{children}</div>
    )
}

export default Container