import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const update = (id, newObj) => {
    console.log('update called, from frontend fetcher.js')
    return axios.put(baseUrl + '/' + id, newObj)
        .then(response => response.data)
        .catch(err => console.error(err))
}

const create = newObj => {
    return axios.post(baseUrl, newObj)
        .then(response => response.data)
}

const remove = id => {
    return axios.delete(baseUrl + '/' + id)
        .then(response => response.data)
}

export default {
    getPersons,
    update,
    create,
    remove,
}