import { Row, Button } from 'react-bootstrap'
import { useBooksInit } from './hooks/useBooksInit'
import ListBooks from './components/ListBooks'
import ContainerCustoms from './components/ContainerCustoms'
import ModalForm from './components/ModalForm'
import Loading from './components/Loading'
import './App.css'

const App = () => {
  const { handleClickButton, show, status, loading, handleActionForm, data, handleClose, info, handleEditForm, handledButtonRemove } = useBooksInit()
  return (
    <ContainerCustoms>
      <Button onClick={() => handleClickButton('add')}>Agregar nuevo Libro</Button>
      <ModalForm
        show={show}
        handleActionForm={handleActionForm}
        status={status}
        handleClose={handleClose}
        info={info}
      />
      {loading
        ? <Loading />
        : (
          <Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
            {data.map((item, key) => {
              return (
                <div key={key}>
                  <ListBooks item={item} handleEditForm={handleEditForm} handledButtonRemove={handledButtonRemove} />
                </div>
              )
            })}
          </Row>
          )}
    </ContainerCustoms>
  )
}

export default App
