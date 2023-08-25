import React from "react";
import cl from "./button.module.css"

const Button = ({children, ...props}) => {

    const rootCl = [cl.button]

    if(props.disabled){
        rootCl.push(cl.disabled)
    }

    return (
        <button className={rootCl.join(' ')} {...props}>
            {children}
        </button>
    )

}

export default Button