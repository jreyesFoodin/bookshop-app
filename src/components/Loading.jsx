const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='spinner-border text-success' style={{ width: '5rem', height: '5rem' }} role='status'>
        <span className='visually-hidden'>Cargando...</span>
      </div>
    </div>
  )
}

export default Loading
