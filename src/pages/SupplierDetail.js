import React, { useEffect , useState, useCallback} from 'react'

import SuppliersList from '../componentes/SuppliersList';

const SupplierDetail = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSuppliers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response =  await fetch('http://127.0.0.1:8000/api/suppliers/');
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log('DATA:', data);

            const transformedSuppliers = data.map((supplierData) => {
                return {
                    Id: supplierData.id,
                    Nome: supplierData.nome,
                    Nif: supplierData.nif,
                    Morada: supplierData.morada,
                    Email: supplierData.email,
                    Telefone: supplierData.telefone
                };
              });
            setSuppliers(transformedSuppliers);
        } catch(error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(()=>{
        fetchSuppliers()
    }, [fetchSuppliers]);

    // function addSupplierHandler(supplier) {
    //     console.log(supplier);
    //   }

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
        <div className='container'>
            <h1>The Supplier Page</h1>
            <section>
               {content}
            </section>
        </div>
    )
};

export default SupplierDetail;