import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const update = (id, newObj) => {
    return axios.put(baseUrl + '/' + id, newObj)
        .then(response => response.data)
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