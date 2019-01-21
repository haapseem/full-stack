import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const StatButton = (props) => {
  return (
    <button onClick={props.f}>
      {props.value}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
    const [hyva, huono, neutraali] = [props.hyva, props.huono, props.neutraali];

    const ka = () => {
      let x = (hyva - huono) / (hyva + neutraali + huono);
      return isNaN(x) ? 0 : x;
    }

    const pp = () => {
      let x = hyva / (hyva + neutraali + huono) * 100;
      return isNaN(x) ? 0 : x;
    }

    if (hyva + huono + neutraali == 0){
      return (
        <div>
          <h2>Statistiikka</h2>
          <p>Ei yhtään palautetta annettu</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Statistiikka</h2>

        <table>
          <tbody>
            <Statistic name={'hyvä'} value={hyva}/>
            <Statistic name={'neutraali'} value={neutraali}/>
            <Statistic name={'huono'} value={huono}/>
            <Statistic name={'yhteensä'} value={hyva + neutraali + huono }/>
            <Statistic name={'keskiarvo'} value={ka()}/>
            <Statistic name={'positiivisia'} value={pp()}/>

          </tbody>
        </table>
      </div>
    )
}

const App = () => {

  const [hyva, set_hyva] = useState(0);
  const [neutraali, set_neutraali] = useState(0);
  const [huono, set_huono] = useState(0);


  return (
    <div>
      <h2>Anna palautetta</h2>

      <p>
        <StatButton f={() => { set_hyva(hyva + 1); } } value={'hyvä'} />
        <StatButton f={() => { set_neutraali(neutraali + 1); } } value={'neutraali'} />
        <StatButton f={() => { set_huono(huono + 1); } } value={'huono'} />
      </p>

      <Statistics hyva={hyva} huono={huono} neutraali={neutraali} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
