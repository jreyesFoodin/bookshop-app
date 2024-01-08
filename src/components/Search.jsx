const Search = ({ searchTerm, handleSearch }) => {
  return (
    <div className='d-flex gap-2 mt-3 mt-md-0'>
      <input
        type='text'
        className='form-control mb-2'
        placeholder='🔍 Buscar...'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
