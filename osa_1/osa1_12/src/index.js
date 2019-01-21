import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  let anecdotes = [];

  props.anecdotes.forEach(x => {
    anecdotes.push(0);
  });

  const [votes, setVotes] = useState(anecdotes);

  const vote = (x) => {
    let tmp = votes;
    tmp[x] = votes[x] + 1;
    setVotes(tmp);
  }

  const getBast = () => {
    let tmp = -1;
    let tmp_i = -1;
    for(var i = 0; i < votes.length; i++){
      if(votes[i] > tmp){
        tmp = votes[i];
        tmp_i = i;
      }
    }
    return [tmp_i, tmp];
  }

  return (
    <div>
      <h2>anecdotes</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <button onClick={() => {
        vote(selected)
      }}>vote</button>
      <button onClick={() => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
      }}>next anecquote</button>

      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[getBast()[0]]}</p>
      <p>has {getBast()[1]} votes</p>
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
