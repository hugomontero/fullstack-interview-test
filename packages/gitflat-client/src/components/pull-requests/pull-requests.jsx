import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import './pull-requests.css'

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
    console.log(event.view);
}
const render = () => {
    
    return (
        <>
            <h1 className="pull-requests-title"> Pull Requests </h1>
            <DataTable
                onRowClicked={handleClick}
                pointerOnHover={true}
                columns={columns}
                data={data}
            />
        </>
    )
}
const PullRequests = () =>{
    
    return render();
   
}

export default PullRequests;