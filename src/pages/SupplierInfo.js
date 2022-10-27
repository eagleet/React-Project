import { useRef, useState, useCallback, useEffect } from "react";
import classes from "./SupplierInfo.module.css";
import { useHistory } from "react-router-dom";

const SupplierInfo = ({ match }, props) => {
  const nameRef = useRef("");
  const nifRef = useRef("");
  const moradaRef = useRef("");
  const emailRef = useRef("");
  const telefoneRef = useRef("");
  const history = useHistory();
  const supplierId = match.params.id;
  const [supplier, setSupplier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplier = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/suppliers/${supplierId}/`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log("DATA:", data);
      const transformedSupplier = data;

      setSupplier(transformedSupplier);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [supplierId]);

  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);

  let content = <p>Não encontramos Fornecedores.</p>;

  if (Object.keys(supplier).length > 0) {
    content = (
      <form onSubmit={submitHandler} className={classes.container}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={supplier.nome}
          ref={nameRef}
        />
        <label htmlFor="nif">Nif:</label>
        <input
          id="nif"
          type="text"
          name="nif"
          defaultValue={supplier.nif}
          ref={nifRef}
        />
        <label htmlFor="morada">Morada:</label>
        <input
          id="morada"
          type="text"
          name="morada"
          defaultValue={supplier.morada}
          ref={moradaRef}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="text"
          name="email"
          defaultValue={supplier.email}
          ref={emailRef}
        />
        <label htmlFor="telefone">Telefone:</label>
        <input
          id="telefone"
          type="text"
          name="telefone"
          defaultValue={supplier.telefone}
          ref={telefoneRef}
        />
        <button className={classes.btn}>Actualizar</button>
      </form>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  function submitHandler(event) {
    event.preventDefault();

    const supplier = {
      id: supplierId,
      nome: nameRef.current.value,
      nif: nifRef.current.value,
      morada: moradaRef.current.value,
      email: emailRef.current.value,
      telefone: telefoneRef.current.value,
    };

    updateSupplierHandler(supplier);

    history.push("/supplier");
  }

  const updateSupplierHandler = async (supplier) => {
    const response = await fetch(`/api/suppliers/${supplierId}/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });
    const data = await response.json();
    console.log(data);
  };
  // console.log(match.params.id, supplier.nome, nifRef.current.value);
  return content;
};

export default SupplierInfo;
