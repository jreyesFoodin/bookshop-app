import { useField } from 'formik'

const InputText = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props)
  const handleChange = (e) => {
    field.onChange(e)
    onChange && onChange(e)
  }

  return (
    <div className='col-md-12'>
      <div className='input-group has-validation'>
        <input
          className={`form-control ${!!meta.touched && !!meta.error ? 'is-invalid' : null}`}
          {...field} {...props}
          placeholder={label}
          onChange={handleChange}
        />
        {meta.touched &&
          meta.error
          ? <div className='invalid-feedback'>{meta.error}</div>
          : null}
      </div>
    </div>
  )
}

export default InputText
