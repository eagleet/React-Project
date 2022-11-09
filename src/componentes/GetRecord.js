import React, { useState, useContext, useEffect, useCallback } from "react";
import RecordsList from "../pages/Records";
import AuthContext from "../store/auth-context";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import classes from "./GetRecords.module.css";
// import { useHistory } from "react-router-dom";
import RecordModal from "./UI/RecordModal";

const GetRecord = () => {
  const [records, setRecords] = useState([]);
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
      console.log("DATA:", data);
      // setSuppliers(data);
      const transformedTypeRecords = data.map((recordTypeData) => {
        return {
          Id: recordTypeData.id,
          Name: recordTypeData.name,
        };
      });
      setTipeOfRecords(transformedTypeRecords);
      console.log(transformedTypeRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.token]);

  useEffect(() => {
    fetchRecordType();
  }, [fetchRecordType]);

  //--------------------------------Fetch records with tipo de Registo ------------------------

  const fetchTypeRecord = async (tipoRegisto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/questoes/${tipoRegisto}/`, {
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
      // setSuppliers(data);
      const transformedRecords = data.map((recordData) => {
        return {
          Questao: recordData.questao,
        };
      });
      setRecords(transformedRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  // ---------------------------------Function to handle filter Search---------------------------------

  const searchItems = (event) => {
    setSearchInput(event.target.value);
    console.log(event.target.value);
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
            <button className={classes.btn} onClick={()=> setIsOpen(true)}>
              Adicionar Registo Novo
            </button>
            {isOpen && <RecordModal setIsOpen={setIsOpen} />}
          </div>
          <div className={classes.search_container}>
            <div className={classes.cell}>
              {!dropdown && (
                <div
                  style={{
                    border: "1px solid black",
                    width: "115px",
                    fontWeight: "bold",
                  }}
                  onClick={handleMouseDropdown}
                >
                  Periocidade
                  <IoIosArrowDown style={{ height: "1em" }} />
                </div>
              )}
              {dropdown && (
                <div style={{ border: "1px solid black", width: "180px" }}>
                  <div
                    onClick={handleMouseDropdown}
                    style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    Periocidade <IoIosArrowUp style={{ height: "1em" }} />
                  </div>
                  {tipeOfRecords.map((tipo) => {
                    return (
                      <div
                        key={tipo.Id}
                        onClick={(event) => fetchTypeRecord(tipo.Id, event)}
                      >
                        {tipo.Name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={classes.cell}>
              <p>Filtros:...</p>
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
          <h1>Registo</h1>
          <div className={classes.row}>
            <div className={classes.cell}>Questão</div>
            <div className={classes.cell}>SIM</div>
            <div className={classes.cell}>NÃO</div>
            <div className={classes.cell}>EM CURSO </div>
            <div className={classes.cell}>NÃO APLICAVEL</div>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default GetRecord;
