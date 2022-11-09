import React, { useState, useContext } from "react";
import classes from "./RecordModal.module.css";

import AuthContext from "../../store/auth-context";

const RecordModal = ({ setIsOpen }, props) => {
  const [isSelectedRadio, setIsSelectedRadio] = useState();

  const authCtx = useContext(AuthContext);

  const handleChange = (e) => {
    setIsSelectedRadio(e.target.value);
  };

  const createRecordHandler = async (createRecord) => {
    const response = await fetch(`/api/create-record/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${authCtx.token}`
      },
      body: JSON.stringify(createRecord),
    });
    const data = await response.json();
    console.log(data);
  };

  function submitHandler(event) {
    let today = new Date();  // get the date
    let day = ("0" + today.getDate()).slice(-2);  //get day with slice to have double digit day
    let month = ("0" + (today.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
    let date = today.getFullYear() + '-' + month + '-' + day;
    let False = 'False';

    const createRecord = {
        dataregisto: date,
        tiporegisto: isSelectedRadio,
        status: False,
    };
    createRecordHandler(createRecord);
  };

  function bothFunc(event) {
    setIsOpen(false);
    submitHandler(event);
  }


  return (
    <div>
      <div className={classes.backdrop} onClick={() => setIsOpen(false)} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>Novo Registo</h2>
        </header>
        <div className={classes.content}>
          <label className={classes.labelRegisto}>
            Verificação Mensal
            <input type="radio" id="1" name="tipo-de-registo" value='1' onChange={handleChange} checked={isSelectedRadio === '1'}></input>
          </label>
          <label className={classes.labelRegisto}>
            Verificação Semanal
            <input type="radio" id="2" name="tipo-de-registo" value='2' onChange={handleChange} checked={isSelectedRadio === '2'}></input>
          </label>
          <label className={classes.labelRegisto}>
            Verificação Trimestral
            <input type="radio" id="3" name="tipo-de-registo" value='3' onChange={handleChange} checked={isSelectedRadio === '3'}></input>
          </label>
        </div>
        <footer className={classes.actions}>
          <button className={classes.btn} onClick={bothFunc}>
            Adicionar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RecordModal;
