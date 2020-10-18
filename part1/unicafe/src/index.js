import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RATING_GOOD = 0
const RATING_NEUTRAL = 1
const RATING_BAD = 2

const Statistic = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad 

  const averageScore = () => {
    if (total === 0) {
      return 0
    }
    let score = (good - bad) / total
    return Number.parseFloat(score).toPrecision(2)
  }

  const percentageOfPositiveFeedback = () => {
    if (total === 0) return 0

    let percent = (good / total) * 100
    return Number.parseFloat(percent).toPrecision(3)
  }

  return (
    <div className='statistics'>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={total} />
          <Statistic text='average' value={averageScore()} />
          <Statistic text='positive' value={`${percentageOfPositiveFeedback()}%`} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementRating = (rating, toAdd = 1) => () => {
    switch(rating) {
      case RATING_GOOD:
        setGood(good + toAdd)
        break
      case RATING_NEUTRAL:
        setNeutral(neutral + toAdd)
        break
      case RATING_BAD:
        setBad(bad + toAdd)
        break
      default: break
    }
  }

  return (
    <div>
      <div className='feedback'>
        <h1>give feedback</h1>
        <Button handleClick={incrementRating(RATING_GOOD)} text='good' />
        <Button handleClick={incrementRating(RATING_NEUTRAL)} text='neutral' />
        <Button handleClick={incrementRating(RATING_BAD)} text='bad' />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)