import React, { useEffect, useState, useCallback, useContext } from "react";
import classes from "./SuppliersDetails.module.css";
import SuppliersList from "../componentes/SuppliersList";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const SuppliersDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  // ---------------------------------Function to add new supplier---------------------------------
  const onClickHandler = () => {
    history.push(`/supplier/create/`);
  };

  // ---------------------------------Function to fetch all suppliers--------------------------------
  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/suppliers/", {
        method:'GET',
        headers: {'Authorization': `Bearer ${authCtx.token}`}
      });
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
  }, [authCtx.token]);

  // -------------------When function fetchSuppliers changes, the useEffect triggers, so the function fetchSuppliers runs again---------------------------------

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

 
  // ---------------------------------Function to handle filter Search---------------------------------

  const searchItems = (event) => {
    setSearchInput(event.target.value);
    console.log(event.target.value)
    if (event.target.value !== '') {
      const filteredData = suppliers.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };

   //--------------------------------- Verification if the data fetched is true---------------------------------

   let content = <p>Não encontramos Fornecedores.</p>;

   if (searchInput.length <= 1) {
     content = <SuppliersList suppliers={suppliers} />;
   } else {
     content = <SuppliersList filteredResults={filteredResults} />;
   }
   if (error) {
     content = <p>{error}</p>;
   }
   if (isLoading) {
     content = <p>Loading...</p>;
   }
 

  //---------------------------------Function SuppliersDetails---------------------------------

  return (
    <div className="container">
      <div className={classes.table}>
        <div className={classes["btn-wrapper"]}>
          <button className={classes.btn} onClick={onClickHandler}>
            Adicionar Fornecedor novo
          </button>
        </div>
        <div className={classes.search_container}>
          <div className={classes.cell}>
            <p>Filtros:</p>
          </div>
          <div className={classes.cell}>
            <input
              type="text"
              placeholder="Search..."
              className="search"
              onChange={searchItems}
            />
          </div>
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
