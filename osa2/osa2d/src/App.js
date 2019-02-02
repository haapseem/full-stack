
import React, {useState, useEffect} from 'react';
import Persons from './persons';
import PersonsForm from './personsform';
import FilterForm from './filterform';
import axios from 'axios';
import httpservice from './services/httpservice';

const App = (props) => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    httpservice.getAll().then(x => setPersons(x))
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtterer, setFiltterer] = useState('');

  const refresh = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }

  const remove = (o) => {
    if(window.confirm('Poistetaanko ' + o.name)){
      httpservice.remove(o.id).then(response => refresh())
    }
  }

  const addName = (event) => {
    event.preventDefault();
    const names = []
    persons.map(x => names.push(x.name))
    if(names.includes(newName)){
      if(window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella')){
        var o = {}
        persons.map(x => { if(x.name==newName){ o = x; } })

        o.number = newNumber

        httpservice.update(o, o.id).then(response => refresh())
      }
      return ;
    }

    httpservice.create({
      name: newName,
      number: newNumber
    }).then(response => {
      refresh()
    })
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <h4> rajaa tuloksia </h4>
      <FilterForm filtterer={filtterer} setFiltterer={setFiltterer} />


      <h4> lisää uusi </h4>
      <PersonsForm addName={addName} newName={newName} newNumber={newNumber}
          setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Puhelinnumerot</h2>
      <Persons persons={persons} filtterer={filtterer} remove={remove} />
    </div>
  )
}


export default App;
