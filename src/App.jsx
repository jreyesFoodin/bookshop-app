import { Row, Button } from 'react-bootstrap'
import { useBooks } from './action/books'
import { useEffect, useState } from 'react'
import ListBooks from './components/ListBooks'
import ContainerCustoms from './components/ContainerCustoms'
import ModalForm from './components/ModalForm'
import './App.css'

const App = () => {
  const { AllBooksAction, CreatedBookAction, UpdatedBookAction, RemovedBookAction } = useBooks()
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  useEffect(() => {
    initBook()
  }, [])
  const initBook = async () => {
    const response = await AllBooksAction()
    if (response.success) {
      setData(response.data)
    }
  }
  const handleActionForm = async (status, body, id) => {
    let response = ''
    if (status === 'add') {
      response = await CreatedBookAction(body)
    } else if (status === 'edit') {
      response = await UpdatedBookAction(body, id)
    } else if (status === 'remove') {
      response = await RemovedBookAction(id)
    }
  }
  return (
    <ContainerCustoms>
      <Button onClick={() => setShow(true)}>Agregar nuevo Libro</Button>
      <ModalForm show={show} />
      <Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
        {data.map((item, key) => {
          return (
            <div key={key}>
              <ListBooks item={item} />
            </div>
          )
        })}
      </Row>
    </ContainerCustoms>
  )
}

export default App
