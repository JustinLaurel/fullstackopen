import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(generateEmptyVotes)

  function generateEmptyVotes() {
    let votes = []
    for (let i = 0; i < props.anecdotes.length; i++) {
      votes.push(0)
    }
    return votes
  }

  const generateRandomNumber = (min, max) => {
    let randomFloat = Math.random() * ((max) - min) + min
    return Math.floor(randomFloat)
  }

  const handlers = (() => {
    const nextAnecdote = () => {
      let anecdoteIndex
      do {
        anecdoteIndex = generateRandomNumber(0, props.anecdotes.length)
      } while (anecdoteIndex === selected)
      setSelected(anecdoteIndex)
    }

    const incrementVote = () => {
      let copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
    }

    return {
      nextAnecdote,
      incrementVote,
    }
  })()

  const getMostVotedIndex = () => {
    let highest = 0
    let mostVoted 

    votes.forEach((vote, index) => {
      if (vote > highest) {
        highest = vote
        mostVoted = index
      }
    })

    console.log(`mostVoted=${mostVoted}`)
    console.log(`highest=${highest}`)
    return mostVoted

  }
  
  return(
    <div>
      <div className='anecdotes'>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handlers.incrementVote}>Vote</button>
        <button onClick={handlers.nextAnecdote}>Next</button>
      </div>

      <div className='mostVotes'>
        <h1>Anecdotes with most votes</h1>
        <p>{anecdotes[getMostVotedIndex()]}</p>
        <p>has {votes[getMostVotedIndex()]} votes</p>
      </div>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)