import React from 'react'

const HeadingComp = (props) => {
  return (
    <div>
      <h1 className="text-center sign-up-heading">
        {props.first} <br /> {props.second}
      </h1>
    </div>
  )
}

export default HeadingComp