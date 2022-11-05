import React, { useEffect, useState, useCallback } from "react";
import classes from "./SuppliersDetails.module.css";
import { useHistory } from "react-router-dom";
import DataTable from "../componentes/DataTableBase";
import "react-data-table-component-extensions/dist/index.css";


const SuppliersDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const history = useHistory();

  // ---------------------------------Function to add new supplier---------------------------------
  const onClickHandler = () => {
    history.push(`/supplier/create/`);
  };

  // ---------------------------------Function to fetch all suppliers--------------------------------
  const fetchSuppliers = useCallback(async () => {


      const response = await fetch("/api/suppliers/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log("DATA:", data);
      // setSuppliers(data);
      // const transformedSuppliers = data.map((supplierData) => {
      //   return {
      //     Id: supplierData.id,
      //     Nome: supplierData.nome,
      //     Nif: supplierData.nif,
      //     Morada: supplierData.morada,
      //     Email: supplierData.email,
      //     Telefone: supplierData.telefone,
      //   };
      // });
      // setSuppliers(transformedSuppliers);
       setSuppliers(data);

  }, []);

  // -------------------When function fetchSuppliers changes, the useEffect triggers, so the function fetchSuppliers runs again---------------------------------

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);


  const subHeaderComponent = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Procurar</p>
      <input id="outlined-basic" label="Search" placeholder="Search..." variant="outlined" size="small" style={{ margin: '5px' }} />
      {/* <Icon1 style={{ margin: '5px' }} color="action" />
      <Icon2 style={{ margin: '5px' }} color="action" />
      <Icon3 style={{ margin: '5px' }} color="action" /> */}
    </div>
  );

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
    },
    {
      name: 'Nif',
      selector: row => row.nif,
      sortable: true
    },
    {
      name: 'Morada',
      selector: row => row.morada,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.telefone,
      sortable: true,
    },
  ]

  const onClickSelect = (selectedRows) => {
    // console.log(selectedRows)
    history.push(`/supplier/${selectedRows.selectedRows[0].id}/update/`);
  };


  // const ExpandedComponent = ({ data }) => <pre onClick={(event) => onClickExpand(event)}></pre>;
  

  //---------------------------------Function SuppliersDetails---------------------------------

  return (
    <div className={classes.container}>     
          <button className={classes.btn} onClick={onClickHandler}>
            Adicionar Fornecedor novo
          </button>
        <DataTable
          title='Fornecedores'
          columns={columns}
          data={suppliers}
          subHeaderComponent={subHeaderComponent}
          onSelectedRowsChange={onClickSelect}
          theme='solarized'
        />
    </div>
  );
};

export default SuppliersDetails;