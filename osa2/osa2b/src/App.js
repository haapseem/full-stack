
import React, {useState} from 'react';
import Persons from './persons';
import PersonsForm from './personsform';
import FilterForm from './filterform';

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtterer, setFiltterer] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const names = []
    persons.map(x => names.push(x.name))
    if(names.includes(newName)){
      alert(newName + ' on jo luettelossa');
      return ;
    }
    // tmp
    persons.push({
      name: newName,
      number: newNumber
    });
    setPersons(persons)

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
      <Persons persons={persons} filtterer={filtterer} />
    </div>
  )
}


export default App;
