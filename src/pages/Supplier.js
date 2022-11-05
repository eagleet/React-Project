import classes from "./Supplier.module.css";
import { useHistory } from "react-router-dom";

const Supplier = (props) => {
  const history = useHistory();

  const onClickHandler = (id) => {
    history.push(`/supplier/${id}/update/`);
  };

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{props.Id}</div>
      <div className={classes.cell}>{props.Nome}</div>
      <div className={classes.cell}>{props.Nif}</div>
      <div className={classes.cell}>{props.Morada}</div>
      <div className={classes.cell}>{props.Email}</div>
      <div className={classes.cell}>{props.Telefone}</div>
      <button className={classes.btn} onClick={(event) => onClickHandler(props.Id, event)}>Seleccionar</button>
    </div>
  );
};

export default Supplier;
