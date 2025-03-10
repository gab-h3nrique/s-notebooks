import * as React from 'react'

const PasteIcon = (props: React.SVGProps<SVGSVGElement>) => {

    return (
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" {...props}>
            <path d="M160 0c-23.7 0-44.4 12.9-55.4 32H48C21.5 32 0 53.5 0 80V400c0 26.5 21.5 48 48 48H192V176c0-44.2 35.8-80 80-80h48V80c0-26.5-21.5-48-48-48H215.4C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48V448v16c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V256H416c-17.7 0-32-14.3-32-32V128H320 272zM160 88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm256 40v96h96l-96-96z"
            stroke={`${props.stroke}`} strokeWidth={`${props.strokeWidth}`}/>
        </svg>
    )
}

export default PasteIcon

