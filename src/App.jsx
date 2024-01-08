import { Row, Button } from 'react-bootstrap'
import { useBooks } from './action/books'
import { useEffect, useState } from 'react'
import ListBooks from './components/ListBooks'
import ContainerCustoms from './components/ContainerCustoms'
import ModalForm from './components/ModalForm'
import Loading from './components/Loading'
import Swal from 'sweetalert2'
import './App.css'

const App = () => {
  const { AllBooksAction, CreatedBookAction, UpdatedBookAction, RemovedBookAction } = useBooks()
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('add')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    initBook()
  }, [])
  const initBook = async () => {
    setLoading(true)
    const response = await AllBooksAction()
    if (response.success) {
      setData(response.data)
    }
    setLoading(false)
  }
  const handleClickButton = (value) => {
    setStatus(value)
    setShow(!show)
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
    if (response.success) {
      Swal.fire({
        title: 'Felicidades',
        text: 'Se realizo bien la accion',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          setStatus('add')
          setShow(false)
          initBook()
        }
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }
  return (
    <ContainerCustoms>
      <Button onClick={() => handleClickButton('add')}>Agregar nuevo Libro</Button>
      <ModalForm
        show={show}
        handleActionForm={handleActionForm}
        status={status}
        handleClose={() => setShow(false)}
      />
      {loading
        ? <Loading />
        : (
          <Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
            {data.map((item, key) => {
              return (
                <div key={key}>
                  <ListBooks item={item} />
                </div>
              )
            })}
          </Row>
          )}
    </ContainerCustoms>
  )
}

export default App
