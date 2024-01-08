import { useState } from 'react'
import axios from 'axios'
// const baseUrl = process.env.REACT_APP_API_URL
const baseUrl = 'http://localhost:3000'
// Constantes de códigos de estado de error
const ERROR_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

const useApi = () => {
  const [data, setData] = useState(null)
  const [errorHandle, setErrorHandle] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleRequest = async (method, endpoint = '', body = {}, params = {}, headers = {}, success) => {
    try {
      console.log(`${baseUrl}/${endpoint}`)
      setLoading(true)
      let response = await axios.request({
        method,
        url: `${baseUrl}/${endpoint}`,
        data: body,
        params,
        headers
      })
      if (!success) {
        response = { ...response.data, success: true }
      }
      setData(response.data)
      setLoading(false)
      setErrorHandle(null) // Limpiar el estado de error en caso de éxito
      return response
    } catch (error) {
      if (error.response) {
        // Error de respuesta del servidor
        const { status, data } = error.response
        let errorMessage = 'Ocurrió un error en el servidor.'
        if (status === ERROR_STATUS.BAD_REQUEST) {
          errorMessage = data.error || 'Petición incorrecta. Verifica los datos enviados.'
        } else if (status === ERROR_STATUS.UNAUTHORIZED) {
          errorMessage = data.error || 'No estás autorizado para acceder a este recurso.'
        } else if (status === ERROR_STATUS.FORBIDDEN) {
          errorMessage = data.error || 'No tienes permisos para acceder a este recurso.'
        } else if (status === ERROR_STATUS.NOT_FOUND) {
          errorMessage = data.error || 'El recurso solicitado no fue encontrado.'
        } else if (status === ERROR_STATUS.INTERNAL_SERVER_ERROR) {
          errorMessage = data.error || 'Error interno del servidor. Por favor, intenta más tarde.'
        }
        setErrorHandle({ status, data, message: errorMessage })
        return { status, data, message: errorMessage, success: false }
      } else if (error.request) {
        // Error de no recibir respuesta del servidor
        const messageError = {
          status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'No se pudo recibir una respuesta del servidor.',
          success: false
        }
        setErrorHandle(messageError)
        return messageError
      } else {
        // Error de configuración de la petición
        const messageError = {
          status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'Error de configuración de la petición.',
          success: false
        }
        setErrorHandle(messageError)
        return messageError
      }
    }
  }

  const get = async (endpoint = '', params = {}, headers = {}, success) => {
    return handleRequest('get', endpoint, null, params, headers, success)
  }

  const post = async (endpoint = '', body = {}, params = {}, headers = {}) => {
    return handleRequest('post', endpoint, body, params, headers)
  }

  const put = async (endpoint = '', body = {}, params = {}, headers = {}) => {
    return handleRequest('put', endpoint, body, params, headers)
  }

  const remove = async (endpoint = '', params = {}, headers = {}) => {
    return handleRequest('delete', endpoint, null, params, headers)
  }

  return {
    data,
    errorHandle,
    loading,
    get,
    post,
    put,
    remove
  }
}

export default useApi
