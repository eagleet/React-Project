import Records from '../pages/Records'

const RecordsList = (props) => {
  return (
    <>
    {!props.records && (props.filteredResults.map((record) => (
      <Records
        key={record.Id}
        Data={record.Data}
        Tipo={record.Tipo}
        Status={record.Status}
      />
    )))}
    {props.records && (props.records.map((record) => (
      <Records 
        key={record.Id}
        Data={record.Data}
        Tipo={record.Tipo}
        Status={record.Status}
      />
    )))}
</>
  )
}

export default RecordsList