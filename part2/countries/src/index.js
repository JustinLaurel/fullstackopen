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

const Button = ({ onClick, text, className }) => {
  return (
    <button onClick={onClick} className={className}>{text}</button>
  )
}


const Countries = ({ countries, countriesToShow, setToShow }) => {
  const getCountryNames = countries => {
    if (countries.length === 0) return []
    const names = []

    countries.forEach(country => {
      names.push(country.name)
    })

    return names
  }

  const getListOfCountries = () => {
    const countryElements = []
    const countryToShowNames = getCountryNames(countriesToShow)

    countries.forEach(country => {
      let countryName = country.name
      if (countryToShowNames.includes(countryName)) {
        countryElements.push(
          <li key={country.alpha3Code}>
            {countryName} 
            <Button onClick={handleToggleCountry} text='show' className={countryName}/>
            <Country country={country} />
          </li>
        )
      } else {
        countryElements.push(
          <li key={country.alpha3Code}>
            {countryName} 
            <Button onClick={handleToggleCountry} text='show' className={countryName}/>
          </li>
        )
      }
    })

    return countryElements
  }

  const handleToggleCountry = event => {
    const button = event.currentTarget
    const countryName = event.currentTarget.className

    if (button.textContent === 'show') {
      const newToShow = countries.filter(country => {
        return country.name === countryName
      })

      setToShow(countriesToShow.concat(newToShow))
      button.textContent = 'hide'
    } 
    else if (button.textContent === 'hide') {
      hideCountry(countryName)
      button.textContent = 'show'
    }
  }

  const hideCountry = countryName => {
    const newToShow = countriesToShow.filter(country => {
      return country.name !== countryName
    })

    setToShow(newToShow)
  }

  switch (true) {
    case countries.length === 1:
      const country = countries[0]
      return <Country country={country} />
    
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

    case countries.length > 0 && countries.length <= 10:
      return <ul>{getListOfCountries(countries, countriesToShow)}</ul>

    default:
      return <p>Failed to load</p>
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesQueried, setQueried] = useState([])
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
    setQueried(queriedCountries)
    setToShow([])
  }

  return(
    <div>
      <Search value={searchQuery} onChange={handleSearchChange}/>
      <Countries countries={countriesQueried} countriesToShow={countriesToShow} setToShow={setToShow}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))