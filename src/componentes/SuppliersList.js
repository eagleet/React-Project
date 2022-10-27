import Supplier from "../pages/Supplier";

const SuppliersList = (props) => {
  return (
    <>
        {props.suppliers.map((supplier) => (
          <Supplier
            // supplierKey={key}
            // supplier={supplier}
            key = {supplier.Id}
            Id = {supplier.Id}
            Nome={supplier.Nome}
            Nif={supplier.Nif}
            Morada={supplier.Morada}
            Email={supplier.Email}
            Telefone= {supplier.Telefone}
          />
        ))}
    </>
  );
};

export default SuppliersList;
