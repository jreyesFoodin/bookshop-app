import { Row, Button } from 'react-bootstrap'
import { useBooksInit } from './hooks/useBooksInit'
import ListBooks from './components/ListBooks'
import ContainerCustoms from './components/ContainerCustoms'
import ModalForm from './components/ModalForm'
import Loading from './components/Loading'
import Search from './components/Search'
import './App.css'

const App = () => {
  const { handleClickButton, show, status, loading, handleActionForm, filteredData, handleClose, info, handleEditForm, handledButtonRemove, searchTerm, handleSearch } = useBooksInit()
  return (
    <ContainerCustoms>
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
          <>
            <div className='d-md-flex align-items-center justify-content-between mb-4'>
              <div>
                <Button variant='success' onClick={() => handleClickButton('add')}>Agregar nuevo Libro</Button>
              </div>
              {filteredData.length > 0 && <Search searchTerm={searchTerm} handleSearch={handleSearch} />}
            </div>
            {filteredData.length > 0
              ? (
                <Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
                  {filteredData.map((item, key) => {
                    return (
                      <div key={key}>
                        <ListBooks item={item} handleEditForm={handleEditForm} handledButtonRemove={handledButtonRemove} />
                      </div>
                    )
                  })}
                </Row>
                )
              : null}
          </>
          )}
    </ContainerCustoms>
  )
}

export default App
