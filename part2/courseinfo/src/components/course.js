import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  let sum = course.parts.reduce((total, current) => total + current.exercises, 0)

  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  let allParts = []
  
  course.parts.forEach(part => {
    allParts.push(<Part key={part.id} part={part} />)
  })

  return (
    <>
      {allParts}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course