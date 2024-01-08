import { Container } from 'react-bootstrap'
const ContainerCustoms = ({ children }) => {
  return (
    <div className='main main-app p-3 p-lg-4'>
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default ContainerCustoms
