import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './commits.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/gitflat';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const columns = [
    {
        name: 'Commit Message',
        selector: row => row.commit.message,
    },
    {
        name: 'Timestamp',
        selector: row => row.commit.author.date
    },
    {
        name: 'Author',
        selector: row => row.commit.author.name,

    },
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


    
const Commits = () =>{
    const [open, setOpen] = React.useState(false);
    const [commits, setCommits] = React.useState([]);
    const [error, setError] = useState(null);
    const {name: branchName} = useParams();
    useEffect(() => {
        const url = `${API_URL}/branches/${branchName}/commits`
        fetchData(url, setCommits, setError);
    }, []);
    const [currentRow, setCurrentRow] = React.useState({
        message: '', 
        filesChanged: 0,
        timeStamp: new Date().toISOString(),
        author: ''
    });

    const handleOpen = async(row) => { 
        const singleCommitResponse = await fetch(`${API_URL}/branches/${branchName}/commits/${row.sha}`);
        const singleCommit = await singleCommitResponse.json();
        
        const currentCommit = {
            message: row.commit.message,
            timeStamp: row.commit.author.date,
            author: `${row.commit.author.name}:${row.commit.author.email}`,
            filesChanged: singleCommit?.files?.length
        }
        setCurrentRow(currentCommit);
        setOpen(true) 
    };
    const handleClose = () => setOpen(false);
    


    return (
        <>
            <h1 className="commit-title"> Commits </h1>
            {error &&
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert>
            }
            <DataTable
                onRowClicked={handleOpen}
                pointerOnHover={true}
                columns={columns}
                data={commits}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="commit-detail">
                        <h1>
                            Commit Details
                        </h1>
                        <h2>Message:</h2>
                        <p>{currentRow.message}</p>
                        <hr></hr>
                        <h2>Timestamp</h2>
                        <p>{currentRow.timeStamp}</p>
                        <hr></hr>
                        <h2>Files Changed</h2>
                        <p>{currentRow.filesChanged}</p>
                        <hr></hr>
                        <h2>Author</h2>
                        <p>{currentRow.author}</p>
                    </div>
                </Box>
            </Modal>
        </>
    )



   
}

export default Commits;