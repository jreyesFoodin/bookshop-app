import { Modal, Col, Row } from 'react-bootstrap'
import { Formik, Form as FormFormik } from 'formik'
import InputText from '../components/InputText'
import TextArea from './TextArea'
import Button from '../components/Button'
import { useState } from 'react'
import * as Yup from 'yup'

const ModalForm = ({ show, handleClose, status }) => {
  const [loading, setLoading] = useState(false)
  const [initialValues] = useState({
    nameBook: '',
    descriptionBook: '',
    stock: 0,
    urlImg: ''
  })
  const validationSchema = Yup.object({
    nameBook: Yup.string().required('El nombre del libro es obligatorio'),
    descriptionBook: Yup.string().required('La descripción del libro es obligatoria'),
    stock: Yup.number().min(1, 'El stock debe ser mayor a 0').required('El stock es obligatorio'),
    urlImg: Yup.string().url('La URL de la imagen no es válida').required('La URL es obligatoria')
  })
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Libro</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true)
          // await actionChange(values)
          setLoading(false)
        }}
      >
        <FormFormik>
          <Modal.Body>
            <Row className='mb-3'>
              <Col sm='12'>
                <label className='col-sm-6 col-form-label form-label'>Nombre<span className='text-danger'>*</span></label>
                <InputText name='nameBook' />
              </Col>
              <Col sm='12'>
                <label className='col-sm-12 col-form-label form-label'>Descripcion<span className='text-danger'>*</span></label>
                <TextArea name='descriptionBook' />
              </Col>
              <Col />
            </Row>
            <Row className='mb-3'>
              <Col sm='6'>
                <label className='col-sm-6 col-form-label form-label'>Url Libro<span className='text-danger'>*</span></label>
                <InputText name='urlImg' />
              </Col>
              <Col sm='6'>
                <label className='col-sm-12 col-form-label form-label'>Stock<span className='text-danger'>*</span></label>
                <InputText name='stock' />
              </Col>
              <Col />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant='primary' loading={loading} disabled={loading} type='submit'>
              Guardar
            </Button>
          </Modal.Footer>
        </FormFormik>
      </Formik>
    </Modal>
  )
}

export default ModalForm
