import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



import './branches.css'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/gitflat';

const columns = [
    {
        name: 'Branch Name',
        selector: row => row.name,
    },
    {
        name: 'Commit sha',
        selector: row => row.commit.sha,

    },
];

const handleClick = (row, event) => {
    event.view.window.location = `/branches/${row.name}/commits`;
}

const fetchData = async (url, setData, setError) => {
    try {
      const response = await fetch(url);
      if(response.status === 200 ) {
        const json = await response.json();
        setData(json);
      } else {
        setError(response.statusText);
      }
      return;
    } catch (error) {
    
      setError(error.message);
    }
  };


    

const Branches = () =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const url = `${API_URL}/branches/`
        fetchData(url, setData, setError);
    }, []);
    
    return (
        <>
            <h1 className="branch-title"> Branches </h1>
            {error &&
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert>
            }
            
            <DataTable
                onRowClicked={handleClick}
                pointerOnHover={true}
                columns={columns}
                data={data}
            />
        </>
    );   
}

export default Branches;