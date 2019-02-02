import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  const title = props.course

  return (
    <h1>{title}</h1>
  )
}

const Part = (props) => {

  const title = props.part.name
  const exercise = props.part.exercises

  return (
    <p>
      {title} {exercise}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts

  return (
    < >
      {
        parts.map(x => {
          return (
            <Part part={x} />
          )
        })
      }
    </ >
  )
}
const Total = (props) => {
  const exercises = props.exercises

  const total = exercises.reduce((s, p) => {
    return (isNaN(s) ? s.exercises : s) + p.exercises;
  });

  return (
    <p>yhteensä {total} tehtävää</p>
  )
}

const Course = (props) => {
  const course = props.course;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>

  )
}

export default Course
