import axios from 'axios'

const strapiApiToken = process.env.NEXT_STRAPI_API_TOKEN || '37df0475ffd53004987f697ed581215fe51cc52889a7ff6fae64469078457f00a7bd3950730a29c883d30fda0b142338ccbc94baaf9ecd30980daeb98087bb68b19ed14a9cf6ecbba4a88a500a716182d1b9a47eacb720498e1ba57ef22627ca5b66850b285a45c09034e7160cfd2a44e508f9df2c15d43aaa3266b9a1bad262'
const strapiApiUrl = process.env.NEXT_STRAPI_API_URL || 'http://localhost:1337'

export const fetchDataFromApi = async (endPoint) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${strapiApiToken}`,
    },
  }

  const res = await fetch(`${strapiApiUrl}${endPoint}`, options)
  const data = await res.json()

  return data
}

const api = axios.create({
  baseURL: strapiApiUrl,
  headers: {
    Authorization: `Bearer ${strapiApiToken}`,
  },
})
export default api
