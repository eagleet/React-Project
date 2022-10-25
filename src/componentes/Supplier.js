import React from "react";
import classes from './Supplier.module.css'

const Supplier = (props) => {
    return (
      
        <form method="get">
            <label htmlFor="name">Your name: </label>
            <input id="name" type="text" name="name" defaultValue={props.Nome}/>
            <label htmlFor="nif">Nif: </label>
            <input id="nif" type="text" name="nif" defaultValue={props.Nif}/>
            <label htmlFor="morada">Morada: </label>
            <input id="morada" type="text" name="morada" defaultValue={props.Morada}/>
            <label htmlFor="email">E-mail: </label>
            <input id="email" type="text" name="email" defaultValue={props.Email}/>
            <label htmlFor="telefone">Telefone: </label>
            <input id="telefone" type="text" name="telefone" defaultValue={props.Telefone}/>
            <input type="submit" value="OK"/>
        </form>
      /* <ul className={classes.supplier}>
        <li>{props.Nome}</li>
        <li>{props.Nif}</li>
        <li>{props.Morada}</li>
        <li>{props.Email}</li>
        <li>{props.Telefone}</li>
      </ul> */
    );
  };

export default Supplier;