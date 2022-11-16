import React, { useState, useContext, useEffect, useCallback } from "react";
import RecordsList from "./RecordsList";
import AuthContext from "../store/auth-context";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import classes from "./GetRecords.module.css";
// import { useHistory } from "react-router-dom";
import RecordModal from "./UI/RecordModal";

const GetRecord = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState([]);
  const [tipeOfRecords, setTipeOfRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  // const [addRecord, setAddRecord] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const authCtx = useContext(AuthContext);
  // const history = useHistory();

  const handleMouseDropdown = () => {
    if (dropdown) {
      setDropdown(false);
      // console.log(isClicked);
    } else {
      setDropdown(true);
      // console.log(isClicked);
    }
  };

  // ----------------------------------fetch tipo de Registo -------------------------------------

  const fetchRecordType = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tipos-de-registo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const transformedTypeRecords = data.map((recordTypeData) => {
        return {
          Id: recordTypeData.id,
          Name: recordTypeData.name,
        };
      });
      setTipeOfRecords(transformedTypeRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.token]);

  useEffect(() => {
    fetchRecordType();
  }, [fetchRecordType]);

  // ----------------------------------fetch Records -------------------------------------

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/records/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log("DATA:", data);
      const transformedRecords = data.map((recordsData) => {
        return {
          Id: recordsData.id,
          Data: recordsData.dataregisto,
          Tipo: recordsData.tiporegisto,
          Status: recordsData.status,
        };
      });
      setRecords(transformedRecords);
      console.log(transformedRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.token]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  //--------------------------------Fetch records with tipo de Registo ------------------------

  const fetchByRecordType = async (tipoRegisto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/records/${tipoRegisto}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      const transformedRecord = data.map((recordData) => {
        return {
          Id: recordData.id,
          Data: recordData.dataregisto,
          Tipo: recordData.tiporegisto,
          Status: recordData.status,
        };
      });
      setRecords(transformedRecord);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  // ---------------------------------Function to handle filter Search---------------------------------

  const searchItems = (event) => {
    setSearchInput(event.target.value);
    // console.log(event.target.value);
    if (event.target.value !== "") {
      const filteredData = records.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };

  // -------------------When function fetchSuppliers changes, the useEffect triggers, so the function fetchSuppliers runs again---------------------------------

  let content = <p>Não encontramos Registos.</p>;

  if (searchInput.length <= 1) {
    content = <RecordsList records={records} />;
  } else {
    content = <RecordsList filteredResults={filteredResults} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <div className="container">
        <div className={classes.table}>
          <div className={classes["btn-wrapper"]}>
            <button className={classes.btn} onClick={() => setIsOpen(true)}>
              Adicionar Registo Novo
            </button>
            {isOpen && <RecordModal setIsOpen={setIsOpen} />}
          </div>
          <div className={classes.search_container}>
            <div className={classes.cell}>
              {!dropdown && (
                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <div
                    className={classes.dropdown}
                    onClick={handleMouseDropdown}
                  >
                    Periocidade
                    <IoIosArrowDown style={{ height: "1em" }} />
                  </div>
                </div>
              )}
              {dropdown && (
                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <div style={{ border: "1px solid black", width: "240px" }}>
                    <div
                      onClick={handleMouseDropdown}
                      style={{ fontWeight: "bold" }}
                    >
                      {" "}
                      Periocidade <IoIosArrowUp style={{ height: "1em", right: 0}} />
                    </div>
                    {tipeOfRecords.map((tipo) => {
                      return (
                        <div
                          className={classes.droplisttype}
                          key={tipo.Id}
                          onClick={(event) => fetchByRecordType(tipo.Id, event)}
                        >
                          {tipo.Name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className={classes.cell}>
              <p>Filtros:</p>
            </div>
            <div className={classes.cell}>
              <div className={classes.cell}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search"
                  onChange={searchItems}
                />
              </div>
            </div>
          </div>
          <h1>Registo</h1>
          <div className={classes.row}>
            <div className={classes.cell}>Data</div>
            <div className={classes.cell}>Tipo</div>
            <div className={classes.cell}>Status</div>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default GetRecord;
