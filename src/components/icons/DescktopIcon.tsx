import * as React from 'react'

const DescktopIcon = (props: React.SVGProps<SVGSVGElement>) => {

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 576 512" {...props}>
          <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z"
        stroke={`${props.stroke}`} strokeWidth={`${props.strokeWidth}`}/>
      </svg>
    )
}
export default DescktopIcon




