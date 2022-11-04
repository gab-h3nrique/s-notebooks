import * as React from 'react'

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            stroke={`${props.stroke}`} strokeWidth={`${props.strokeWidth}`}/>
      
      </svg>

    )
}
export default CheckIcon
