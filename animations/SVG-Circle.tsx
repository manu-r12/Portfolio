import React from 'react'

const SVG_Circle = () => {
  return (
    <svg width="700" height="700" viewBox="0 0 133 131" fill="none" xmlns="http://www.w3.org/2000/svg">

    <path d="M102.242 63.2475C102.242 43.3399 86.105 27.202 66.197 27.202C46.2889 27.202 30.151 43.3399 30.151 63.2475C30.151 83.154 46.2889 99.2939 66.1965 99.2939C86.105 99.2939 102.243 83.154 102.243 63.248" 
    stroke="#fffF" stroke-width="0.15" id="path"/>


    <circle cx="0" cy="0" r="2" fill="purple">
      <animateMotion dur="6s" repeatCount="indefinite" fill="freeze" rotate="auto">
        <mpath xlinkHref="#path"/> {/* Use xlinkHref instead of xlink:href */}
      </animateMotion>
    </circle>
  </svg>
  )
}

export default SVG_Circle