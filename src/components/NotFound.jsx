import { Alert } from 'react-bootstrap'

const NotFound = ({ searchTerm }) => {
  return (
    <Alert variant='warning'>
      <Alert.Heading style={{ textAlign: 'center' }}>No hay Libros registrados</Alert.Heading>
      {searchTerm.length > 0 &&
        <p style={{ textAlign: 'center', fontSize: 15 }}>
          No hay coincidencias con {searchTerm}
        </p>}
    </Alert>
  )
}

export default NotFound
