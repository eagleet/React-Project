import React, { useEffect, useState, useCallback } from "react";
import classes from "./SuppliersDetails.module.css";
import SuppliersList from "../componentes/SuppliersList";
import { useHistory } from "react-router-dom";

const SuppliersDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/supplier/new/`);
  };

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/suppliers/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log("DATA:", data);
      // setSuppliers(data);
      const transformedSuppliers = data.map((supplierData) => {
        return {
          Id: supplierData.id,
          Nome: supplierData.nome,
          Nif: supplierData.nif,
          Morada: supplierData.morada,
          Email: supplierData.email,
          Telefone: supplierData.telefone,
        };
      });
      setSuppliers(transformedSuppliers);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);


  let content = <p>Não encontramos Fornecedores.</p>;

  if (suppliers.length > 0) {
    content = <SuppliersList suppliers={suppliers} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className={classes.table}>
      <div className={classes['btn-wrapper']}>
        <button className={classes.btn} onClick={onClickHandler}>Adicionar Fornecedor novo</button>
      </div>
      <h1>Fornecedores</h1>
        <div className={classes.row}>
          <div className={classes.cell}>Id</div>
          <div className={classes.cell}>Nome</div>
          <div className={classes.cell}>Nif</div>
          <div className={classes.cell}>Morada</div>
          <div className={classes.cell}>Email</div>
          <div className={classes.cell}>Telefone</div>
        </div>   
          {content}
      </div>
    </div>
  );
};

export default SuppliersDetails;
