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
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}
const Total = (props) => {
  const exercises = props.exercises

  return (
    <p>yhteensä {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises} tehtävää</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
