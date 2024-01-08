import { Button, Spinner } from 'react-bootstrap'

const ButtonForm = ({ loading, children, ...props }) => {
  return (
    <Button {...props}>
      {loading
        ? (
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          )
        : children}
    </Button>
  )
}

export default ButtonForm
