import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AddSupplier.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AuthContext from "../store/auth-context";

const AddSupplier = () => {
  const authCtx = useContext(AuthContext);

  const nameRef = useRef("");
  const nifRef = useRef("");
  const moradaRef = useRef("");
  const emailRef = useRef("");
  const telefoneRef = useRef("");
  const history = useHistory();

  const onClickHandler = () => {
    history.push("/supplier/");
  };

  const createSupplierHandler = async (createSupplier) => {
    const response = await fetch(`/api/suppliers/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${authCtx.token}`
      },
      body: JSON.stringify(createSupplier),
    });
    const data = await response.json();
    console.log(data);
  };

  function submitHandler(event) {
    event.preventDefault();

    const createSupplier = {
      nome: nameRef.current.value,
      nif: nifRef.current.value,
      morada: moradaRef.current.value,
      email: emailRef.current.value,
      telefone: telefoneRef.current.value,
    };

    createSupplierHandler(createSupplier);

    history.push("/supplier");
  }

  return (
    <div>
      <button onClick={onClickHandler} className={classes.arrowbtn}>
        <MdKeyboardArrowLeft />
      </button>
      <form method="POST" onSubmit={submitHandler} className={classes.container}>
        <label htmlFor="name">Name:
        <input id="name" type="text" name="name" placeholder="Adicionar nome..." ref={nameRef}/></label>
        <label htmlFor="nif">Nif:
        <input id="nif" type="text" name="nif" placeholder="Adicionar Nif..." ref={nifRef}/></label>
        <label htmlFor="morada">Morada:
        <input id="morada" type="text" name="morada" placeholder="Adicionar morada..." ref={moradaRef}/></label>
        <label htmlFor="email">E-mail:
        <input id="email" type="text" name="email" placeholder="Adicionar e-mail..." ref={emailRef}/></label>
        <label htmlFor="telefone">Telefone:
        <input id="telefone" type="text" name="telefone" placeholder="Adicionar telefone..." ref={telefoneRef}/></label>
        <button className={classes.btn}>Actualizar</button>
      </form>
    </div>
  );
};

export default AddSupplier;