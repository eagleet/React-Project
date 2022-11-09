import classes from './Records.module.css';
import { useHistory } from "react-router-dom";

const Records = (props) => {
    const history = useHistory();

  const onClickHandler = (id) => {
    history.push(`/records/${id}/`);
  };

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{props.Data}</div>
      <div className={classes.cell}>{props.Tipo}</div>
      <div className={classes.cell}>{String(props.Status)}</div>
      <button className={classes.btn} onClick={(event) => onClickHandler(props.Id, event)}>Seleccionar</button>
    </div>
  );
};

export default Records;
