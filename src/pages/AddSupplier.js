import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { classes } from "./AddSupplier.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";

const AddSupplier = () => {

  const nameRef = useRef("");
  const nifRef = useRef("");
  const moradaRef = useRef("");
  const emailRef = useRef("");
  const telefoneRef = useRef("");
  const history = useHistory();

  const onClickHandler = () => {
    history.push("/supplier/");
  };

  const createSupplierHandler = async (supplier) => {
    const response = await fetch(`/api/suppliers/new/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });
    const data = await response.json();
    console.log(data);
  };

  function submitHandler(event) {
    event.preventDefault();

    const supplier = {
      nome: nameRef.current.value,
      nif: nifRef.current.value,
      morada: moradaRef.current.value,
      email: emailRef.current.value,
      telefone: telefoneRef.current.value,
    };

    createSupplierHandler(supplier);

    history.push("/supplier");
  }

  return (
    <div>
      <button className={classes["arrow-btn"]} onClick={onClickHandler}>
        <MdKeyboardArrowLeft />
      </button>
      <form onSubmit={submitHandler} className={classes.container}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" placeholder="Adicionar nome..." ref={nameRef}/>
        <label htmlFor="nif">Nif:</label>
        <input id="nif" type="text" name="nif" placeholder="Adicionar Nif..." ref={nifRef}/>
        <label htmlFor="morada">Morada:</label>
        <input id="morada" type="text" name="morada" placeholder="Adicionar morada..." ref={moradaRef}/>
        <label htmlFor="email">E-mail:</label>
        <input id="email" type="text" name="email" placeholder="Adicionar e-mail..." ref={emailRef}/>
        <label htmlFor="telefone">Telefone:</label>
        <input id="telefone" type="text" name="telefone" placeholder="Adicionar telefone..." ref={telefoneRef}/>
        <button className={classes.btn}>Actualizar</button>
      </form>
    </div>
  );
};

export default AddSupplier;