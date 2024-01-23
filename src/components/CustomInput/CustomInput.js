import React from 'react'

const CustomInput = ({type, input_class, input_id, label }) => {
  return (
    <>
      {/* <div>CustomInput</div> */}

      <div className="form-floating mb-3">
        <input
          type={ type }
          className={ `form-control ${input_class}` }
          id={ input_id }
          placeholder={ label }
        />

        <label
          htmlFor={ input_id }>
          { label }
        </label>
      </div>
    </>
  )
}

export default CustomInput;