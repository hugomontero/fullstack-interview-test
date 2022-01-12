import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import './branches.css'

const columns = [
    {
        name: 'Branch Name',
        selector: row => row.name,
    },
    {
        name: '# Commits',
        selector: row => row.commits,

    },
];

const data = [
    {
        id: 1,
        name: 'Beetlejuice',
        commits: '1988',
    },
    {
        id: 2,
        name: 'Ghostbusters',
        commits: '1984',
    },
]


const handleClick = (row, event) => {
    event.view.window.location = `/branches/${row.name}/commits`;
}
const render = () => {
    
    return (
        <>
            <h1 className="branch-title"> Branches </h1>
            <DataTable
                onRowClicked={handleClick}
                pointerOnHover={true}
                columns={columns}
                data={data}
            />
        </>
    )
}
const Branches = () =>{
    
    return render();
   
}

export default Branches;