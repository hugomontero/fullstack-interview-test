import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './pull-requests.css'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/gitflat';


const columns = [
    {
        name: 'Author',
        selector: row => row.user.login
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

const fetchData = async (url, setData, setError) => {
    try {
      const response = await fetch(url);
      if(response.status === 200 ) {
        const json = await response.json();
        setData(json);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error.message);
    }
    return null;
  };

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

const PullRequests = () =>{
    const [pullRequests, setPullRequests] = React.useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const url = `${API_URL}/pulls`
        fetchData(url, setPullRequests, setError);
        
    }, []);
   
   
    
    const actionsMemo = <Button onClick={newPullRequestHandler}> New Pull Request </Button>

    return (
        <>
            <h1 className="pull-requests-title"> Pull Requests </h1>
            {error &&
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert>
            }
            <DataTable
                columns={columns}
                data={pullRequests}
                actions={actionsMemo}
            />
        </>
    )
   
}

export default PullRequests;