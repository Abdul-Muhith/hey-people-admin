const CustomInput = ({name, value, onChange, onBlur, type, input_class, input_id, label }) => {

  return (
    <>
      {/* <div>CustomInput</div> */}

      <div className="form-floating mt-3">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={ type }
          className={ `form-control ${input_class}` }
          id={ input_id }
          placeholder={ label }
        />

        <label htmlFor={ input_id }>
          { label }
        </label>
      </div>
    </>
  )
}

export default CustomInput;