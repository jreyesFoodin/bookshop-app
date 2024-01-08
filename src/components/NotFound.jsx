const NotFound = ({ handleClickButton }) => {
  return (
    <div className='bg-dark text-secondary px-4 py-5 text-center'>
      <div className='py-5'>
        <h1 className='display-5 fw-bold text-white'>No hay Libros registrados</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='fs-5 mb-4'>¡Hola! Un día genial para ti. Aquí tienes un botón que te facilitará el registro de tus libros.</p>
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
            <button type='button' className='btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold' onClick={() => handleClickButton('add')}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
