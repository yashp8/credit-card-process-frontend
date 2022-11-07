import React from 'react'

const TextInput = (props) => {
    const { label, input } = props;
  return (
    <>
        <label>{label}</label><br/>
        <input {...input} />
    </>
  )
}

export default TextInput