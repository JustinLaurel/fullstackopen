import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import fetcher from './services/fetcher.js'

const Person = ({ person, handleDelete }) => {
  return (
    <li>{person.name}  {person.number} <button onClick={handleDelete(person.id)}>delete</button></li>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return persons.map(person => {
    return <Person person={person} handleDelete={handleDelete} key={person.id} />
  })
}

const Search = ({onChange, newSearch}) => {
  return (
    <div>
      filter shown with <input value={newSearch} type='search' onChange={onChange} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleSubmit, handleNewName, handleNewNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} /> <br />
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ERROR = 1
const SUCCESS = 0

const Notification = ({ message, type=SUCCESS }) => {
  if (message === null) return null

  const messageStyle = type === SUCCESS 
                          ? {color: 'green', border: '2px solid green'}
                          : {color: 'red', border: '2px solid red'} 
  messageStyle.backgroundColor = 'lightgrey'

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ personsToShow, setToShow ] = useState(persons)

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const [message, setMessage] = useState(null)

  const fetchPersons = () => {
    fetcher.getPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setToShow(returnedPersons)
      })
  }

  useEffect(fetchPersons, [])

  const handleChange = changeFunc => event => {
    changeFunc(event.target.value)
  }

  const handleSearch = event => {
    let searchQuery = event.target.value

    let personsMatched = persons
    if (searchQuery !== '') {
      personsMatched = persons.filter(person => {
        return person.name.toLowerCase().includes(searchQuery)
      })
    }

    setToShow(personsMatched)
    setNewSearch(searchQuery)
  }

  const personExists = personToCheck => {
    return persons.some(person => person.name === personToCheck.name)
  }

  const createPerson = (name, number) => {
    return {
      name,
      number
    }
  }

  const clearAddFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const setTemporaryMessage = (message, duration = 3000) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  const addPerson = () => {
    const newPerson = createPerson(newName, newNumber)
    
    fetcher.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat([returnedPerson]))
      setToShow(personsToShow.concat([returnedPerson]))
      setTemporaryMessage(`${returnedPerson.name} successfully added!`)
    })
  }

  const replacePerson = (persons, setter, replacementPerson) => {
    const newPersons = persons.map(person => {
      return person.id !== replacementPerson.id ? person : replacementPerson
    })

    setter(newPersons)
  }

  const filterOut = (toFilter, id) => {
    return toFilter.filter(element => element.id !== id)
  }

  const updatePerson = person => {
    person.number = newNumber

    fetcher.update(person.id, person)
    .then(updatedPerson => {
      replacePerson(persons, setPersons, updatedPerson)
      replacePerson(personsToShow, setToShow, updatedPerson)

      setTemporaryMessage(`${updatedPerson.name}'s number updated!`)
    })
    .catch(error => {
      setPersons(filterOut(persons, person.id))
      setToShow(filterOut(personsToShow, person.id))

      setTemporaryMessage(`${person.name} has already been removed`, ERROR)
    })
  }

  const getPerson = toMatch => {
    const matchedPerson = persons.find(person => person.name === toMatch.name)
    return {...matchedPerson}
  }

  const handleSubmit = event => {
    event.preventDefault()
    const noIdPerson = createPerson(newName, newNumber)

    if (personExists(noIdPerson)) {
      const personWithId = getPerson(noIdPerson)
      updatePerson(personWithId)
    } else {
      addPerson()
    }
    clearAddFields()
  }

  const handleDelete = id => () => {
    const person = persons.filter(person => person.id === id)[0]
    fetcher.remove(id).then(response => setTemporaryMessage(`${person.name} removed!`))
    setPersons(filterOut(persons, id))
    setToShow(filterOut(personsToShow, id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search onChange={handleSearch} newSearch={newSearch}/>

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber}
        handleSubmit={handleSubmit} handleNewName={handleChange(setNewName)} handleNewNumber={handleChange(setNewNumber)}/>

      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))