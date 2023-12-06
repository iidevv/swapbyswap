import React, { HTMLAttributes, ReactNode } from 'react'

type Button = {
    children: ReactNode,
    className?: string
    props?: HTMLAttributes<any>
}

const Button = ({ children, className = "", ...props }: Button) => {
    return (
        <button className={`btn ${className}`}  {...props}>
            <span>{children}</span>
        </button>
    )
}

export default Button