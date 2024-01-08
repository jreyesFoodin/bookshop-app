import { useState, useEffect } from 'react'
import { useBooks } from '../action/books'
import Swal from 'sweetalert2'
export const useBooksInit = () => {
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
  const handleClose = () => {
    setShow(false)
  }
  return {
    data,
    status,
    loading,
    handleClickButton,
    handleActionForm,
    handleClose
  }
}
