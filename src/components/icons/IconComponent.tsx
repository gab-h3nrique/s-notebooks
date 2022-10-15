import * as React from 'react'

const IconComponent = (props: React.SVGProps<SVGSVGElement>) => {

    return (
        <svg width="30" height="30" fill="black"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            {props.children}
        </svg>
    )
}

export default IconComponent

