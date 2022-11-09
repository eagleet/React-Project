import classes from './Records.module.css';
import { useHistory } from "react-router-dom";

const Records = (props) => {
    const history = useHistory();

  const onClickHandler = (id) => {
    history.push(`/records/${id}/`);
  };

  return (
    <div className={classes.container}>
      {/* <div className={classes.recordline}>{props.Id}</div> */}
      <p className={classes.recordline}>{props.Questao}</p>
      {/* <div className={classes.recordline}>{props.Resposta}</div> */}
      <button className={classes.btn} onClick={(event) => onClickHandler(props.Id, event)}>Seleccionar</button>
    </div>
  );
};

export default Records;
