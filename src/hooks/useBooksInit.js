import { useState, useEffect } from 'react'
import { useBooks } from '../action/books'
import Swal from 'sweetalert2'
export const useBooksInit = () => {
  const { AllBooksAction, CreatedBookAction, UpdatedBookAction, RemovedBookAction } = useBooks()
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('add')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({})
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
    setShow(true)
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
        text: response.message,
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
    setStatus('add')
  }
  const handleEditForm = (value) => {
    setInfo(value)
    setStatus('edit')
    setShow(true)
  }
  const handledButtonRemove = (value) => {
    const messageStatus = `¿Desea eliminar el libro ${value.nameBook} ?`
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: messageStatus,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero!',
      cancelButtonText: 'No, quiero!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleActionForm('remove', null, value.id)
      }
    })
  }
  return {
    data,
    status,
    loading,
    info,
    show,
    handleClickButton,
    handleActionForm,
    handleClose,
    handleEditForm,
    handledButtonRemove
  }
}
