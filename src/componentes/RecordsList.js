import React from 'react'
import Records from '../pages/Records'

const RecordsList = (props) => {
  return (
    <>
    {props.records.map((record) => (
      <Records 
        Questao={record.Questao}
      />
    ))}
</>
  )
}

export default RecordsList