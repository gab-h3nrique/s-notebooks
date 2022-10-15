import * as React from 'react'

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => {

    return (
        <svg width="30" height="30" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
            <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"
            stroke={`${props.stroke}`} strokeWidth={`${props.strokeWidth}`}/>
        </svg>
    )
}

export default ArrowUpIcon

