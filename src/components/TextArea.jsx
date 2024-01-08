import { useField } from 'formik'
const TextArea = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <>
      <textarea
        className={`form-control ${
          !!meta.touched && !!meta.error ? 'is-invalid' : null
        }`}
        {...field}
        {...props}
      />
      {children && children}
      {meta && meta.touched && meta.error &&
        <div className='invalid-feedback'>{meta.error}</div>}
    </>
  )
}

export default TextArea
