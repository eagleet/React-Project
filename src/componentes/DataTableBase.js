import React from 'react';
import DataTable from 'react-data-table-component';

function DataTableBase(props) {
    return (
        <DataTable
            pagination
            keyField='id'
            dense
            striped
            selectableRows
            theme='solarized'
            {...props}
        />
    );
}

export default DataTableBase;