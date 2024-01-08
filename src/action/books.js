import useApi from '../hooks/useApi'

export const useBooks = () => {
  const api = useApi()
  const AllBooksAction = async () => {
    try {
      const response = await api.get('books', null, null)
      return response
    } catch (error) {
      console.log('Error AllBooksAction', error.data.response)
      return error
    }
  }
  const CreatedBookAction = async (body) => {
    try {
      const response = await api.post('books', body, null)
      return response
    } catch (error) {
      console.log('Error CreatedBookAction', error.data.response)
      return error
    }
  }
  const UpdatedBookAction = async (body, id) => {
    try {
      const response = await api.put(`books/${id}`, body, null)
      return response
    } catch (error) {
      console.log('Error UpdatedBookAction', error.data.response)
      return error
    }
  }
  const RemovedBookAction = async (id) => {
    try {
      const response = await api.remove(`books/${id}`, null, null)
      return response
    } catch (error) {
      console.log('Error UpdatedBookAction', error.data.response)
      return error
    }
  }
  return {
    AllBooksAction,
    CreatedBookAction,
    UpdatedBookAction,
    RemovedBookAction
  }
}
