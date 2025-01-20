

// Node modules
import PropTypes from "prop-types";


const TextField = ({
  classes = '',
  helperText,
  label,
  name,
  placeholder = ' ',
  fieldClasses = '',
  ...rest
}) => {
  return (
    <div className={`text-field-wrapper ${classes}`}>
      <label 
      htmlFor={name} 
      className="label-text"
      >
        {label}
      </label>

      <input 
      id={name}
      name={name}
      placeholder={placeholder}
      className={`text-field ${fieldClasses}`} 
      {...rest}
      />

      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  )
}

TextField.propTypes = {
  classes: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  fieldClasses: PropTypes.string,
}

export default TextField