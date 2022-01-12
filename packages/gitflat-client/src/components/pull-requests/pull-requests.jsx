import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import './pull-requests.css'

const columns = [
    {
        name: 'Author',
        selector: row => row.author
    },
    {
        name: 'Title',
        selector: row => row.title
    },
    {
        name: 'Description',
        selector: row => row.body

    },
    {
        name: 'Status',
        selector: row => row.state
    },
    {
        name: 'Close',
        button: true,
        cell: row => <ActionComponent row={row} onClick={handleClick}>Action</ActionComponent>,
    }
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        author: 'author',
        body: '1988',
        state: 'open'
    },
    {
        id: 2,
        title: 'My Second Pull request',
        author: 'author',
        body: '1988',
        state: 'open'
    },
]

const ActionComponent = ({  row, onClick  }) => {
    const clickHandler = () => onClick(row);   
  
   return (<Button onClick={clickHandler}>Close</Button>);
  };


const handleClick = (row) => {
    console.log(row);
}
const newPullRequestHandler = (event) => {
    event.view.window.location = `/pull-requests/new`;
}
const render = () => {
    const actionsMemo = <Button onClick={newPullRequestHandler}> New Pull Request </Button>

    return (
        <>
            <h1 className="pull-requests-title"> Pull Requests </h1>
            <DataTable
                columns={columns}
                data={data}
                actions={actionsMemo}
            />
        </>
    )
}
const PullRequests = () =>{
    
    return render();
   
}

export default PullRequests;