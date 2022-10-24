import React from "react";
import classes from './Supplier.module.css'

const Supplier = (props) => {
    return (
      <ul className={classes.supplier}>
        <li>{props.Nome}</li>
        <li>{props.Nif}</li>
        <li>{props.Morada}</li>
        <li>{props.Email}</li>
        <li>{props.Telefone}</li>
      </ul>
    );
  };

export default Supplier;