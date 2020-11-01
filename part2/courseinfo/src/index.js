import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/course.js'


const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 0
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 1,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 2,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 3,
        }
      ]
    },

    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 0,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 1
        }
      ]
    },
  ]

  let allCourses = []
  courses.forEach(course => {
    allCourses.push(<Course key={course.id} course={course} />)
  })

  return (
    <div>
      {allCourses}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))