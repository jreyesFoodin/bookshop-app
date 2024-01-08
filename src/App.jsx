import { Row } from 'react-bootstrap'
import { useBooksInit } from './hooks/useBooksInit'
import ListBooks from './components/ListBooks'
import ContainerCustoms from './components/ContainerCustoms'
import ModalForm from './components/ModalForm'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import Header from './components/Header'
import './App.css'

const App = () => {
  const {
    filteredData,
    status,
    loading,
    info,
    show,
    searchTerm,
    handleClickButton,
    handleActionForm,
    handleClose,
    handleEditForm,
    handledButtonRemove,
    handleSearch
  } = useBooksInit()
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
            {filteredData.length > 0
              ? (
                <>
                  <Header handleClickButton={handleClickButton} searchTerm={searchTerm} handleSearch={handleSearch} />
                  <Row className='g-4 py-5 row-cols-1 row-cols-lg-3 border mb-4'>
                    {filteredData.map((item, key) => {
                      return (
                        <div key={key}>
                          <ListBooks item={item} handleEditForm={handleEditForm} handledButtonRemove={handledButtonRemove} />
                        </div>
                      )
                    })}
                  </Row>
                </>
                )
              : <NotFound handleClickButton={handleClickButton} />}
          </>
          )}
    </ContainerCustoms>
  )
}

export default App
