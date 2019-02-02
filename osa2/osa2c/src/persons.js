
import React from 'react';

const Persons = (props) => {
    return (
      <>
      {
        props.persons.filter(x => x.name.toLowerCase().includes(props.filtterer)).map(p => {
          return <p key={p.name}>{p.name} {p.number}</p>
        })
      }
      </>
    )
}

export default Persons;
