import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const SearchForm = (props) => {
  return (
    <div>
      find countries <input
          value={props.filt}
          onChange={(event) => {
              event.preventDefault();
              props.setFilt(event.target.value);
            }
          }
      />
    </div>
  )
}

const ResLan = (props) => {
  return (
    <>
    <ul>
      {
        props.res.languages.map(x => {
          return (
            <li key={x.name}>
              {x.name}
            </li>
          )
        })
      }
      </ul>
    </>
  )
}

const Weather = (props) => {
  return(
    <>
      <p>
        <b>Temperature: </b>{props.temp_c}
      </p>
    </>
  )
}

const Result = (props) => {
  const r = props.res;

  const getCountry = (x) => {
    axios
        .get('https://restcountries.eu/rest/v2/name/' + x.name + '?fullText=true')
        .then(result => {
      props.setRes(result.data);
    })
  }

  if(r.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }else if(r.length == 1){
    return (
      <>
        <h2>{r[0].name}</h2>
        <p>capital {r[0].capital}</p>
        <p>population {r[0].population}</p>
        <h2>languages</h2>
        <ResLan res={props.res[0]} />
        <img src={r[0].flag} />
        <h2>Weather in {r[0].capital}</h2>

        <div>
          <b>Temperature: </b>{props.w.temp_c} Celcius
        </div>
        <div>
          <img src={'https:' + (props.w.condition ? props.w.condition.icon : '//via.placeholder.com/150')} />
        </div>
        <div>
          <b>Wind: </b>{props.w.wind_kph} kph, direction {props.w.wind_dir}
        </div>
      </>
    )
  }else{
    return (
      <>
        {
          r.map(x => {
            return (
              <div key={x.name}>
                {x.name} <button onClick={() => {getCountry(x)}}>show</button>
              </div>
            )
          })
        }
      </>
    )
  }
}

const App = (props) => {
  const [filt, setFilt] = useState('')
  const [oldFilt, setOldFilt] = useState('')
  const [res, setRes] = useState([])
  const [ores, setORes] = useState([])
  const [w, setW] = useState({})

  // useEffect(() => {
    if(filt != '' && filt != oldFilt){
      axios.get('https://restcountries.eu/rest/v2/name/' + filt).then(result => {
        setRes(result.data)
      })
      setOldFilt(filt)
    }
  // },[])


  if(res.length == 1 && res != ores){
    axios.get('https://api.apixu.com/v1/current.json?key=7c261214588042ac84b171347190202&q=' + res[0].capital).then(result => {
      setORes(res)
      console.log(result.data.current)
      setW(result.data.current)
    })
  }

  return (
    <div>
      <SearchForm filt={filt} setFilt={setFilt}/>
      <Result res={res} setRes={setRes} w={w}/>
    </div>
  )
}

export default App;
