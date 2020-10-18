import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const History = ({allClicks}) => {
  if (allClicks.length === 0) return <div>The app is used by pressing the buttons</div>
  return (
    <div>Button click history: <br />{allClicks.join(' ')}</div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const handleLeftClick = () => {
    setLeft(left + 1)
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text='right'/> 
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))