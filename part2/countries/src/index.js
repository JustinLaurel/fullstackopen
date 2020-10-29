import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Search = ({ searchQuery, onChange }) => {
  return (
    <div>
      find countries <input type='search' value={searchQuery} onChange={onChange}/>
    </div>
  )
}

const Language = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const Languages = ({ country }) => {
  const languages = []
  country.languages.forEach(language => {
    languages.push(<Language name={language.name} key={language.nativeName} />)
  })

  return (
    <ul>{languages}</ul>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1> <br />

      <p>capital {country.capital}</p>
      <p>population {country.population}</p> <br />

      <h2>languages</h2>
      <Languages country={country} />

      <img src={country.flag} alt={country.name} height='200px' width='300px'/>
    </div>
  )
}

const Countries = ({ countries }) => {
  switch (true) {
    case countries.length > 10:
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )

    case countries.length === 0:
      return (
        <div></div>
      )

    case countries.length === 1:
      const country = countries[0]
      return <Country country={country} />
    
    case countries.length > 0 && countries.length <= 10:
      const countryNames = []
      countries.forEach(country => {
        countryNames.push(<li key={country.alpha3Code}>{country.name}</li>)
      })

      return <ul>{countryNames}</ul>

    default:
      return <p>Failed to load</p>
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setToShow] = useState([])

  const [searchQuery, setQuery] = useState('')

  const fetchCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(fetchCountries, [])

  const handleSearchChange = event => {
    let newSearch = event.target.value
    setQuery(newSearch)

    const queriedCountries = []
    countries.forEach(country => {
      if (country.name.toLowerCase().includes(newSearch.toLowerCase())) {
        queriedCountries.push(country)
      }
    })
    setToShow(queriedCountries)
  }

  return(
    <div>
      <Search value={searchQuery} onChange={handleSearchChange}/>
      <Countries countries={countriesToShow}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))