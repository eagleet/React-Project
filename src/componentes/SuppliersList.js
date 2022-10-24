import Supplier from "./Supplier";
import classes from './SupplierList.module.css'

const SuppliersList = (props) => {
    return (
      <div className={classes['suppliers-list']}>
        {props.suppliers.map((supplier) => (
          <Supplier
            key={supplier.Id}
            Nome={supplier.Nome}
            Nif={supplier.Nif}
            Morada={supplier.Morada}
            Email={supplier.Email}
            Telefone= {supplier.Telefone}
          />
        ))}
      </div>
    );
}

export default SuppliersList;