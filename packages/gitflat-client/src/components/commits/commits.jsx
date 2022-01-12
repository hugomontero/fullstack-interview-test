import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './commits.css'

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
        selector: row => row.name,
    },
    {
        name: 'Timestamp',
        selector: row => row.timeStamp
    },
    {
        name: 'Author',
        selector: row => row.author,

    },
];

const data = [
    {
        id: 1,
        name: 'Beetlejuice',
        timeStamp: new Date().toISOString(),
        filesChanged: 20,
        author: '1988',
    },
    {
        id: 2,
        name: 'Ghostbusters',
        timeStamp: new Date().toISOString(),
        filesChanged: 20,
        author: '1984',
    },
]



    
const Commits = () =>{
    const [open, setOpen] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState({
        name: '', 
        filesChanged: 0,
        timeStamp: new Date().toISOString(),
        author: ''
    });
    const handleOpen = (row) => { 
        setCurrentRow(row);
        setOpen(true) 
    };
    const handleClose = () => setOpen(false);
    


    return (
        <>
            <h1 className="commit-title"> Commits </h1>
            <DataTable
                onRowClicked={handleOpen}
                pointerOnHover={true}
                columns={columns}
                data={data}
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
                        <p>{currentRow.name}</p>
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