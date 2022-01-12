import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './new-pull-request.css';


const branches = [
    {
      value: 'main',
      label: 'main',
    },
    {
      value: 'branch1',
      label: 'branch1',
    },
    {
      value: 'branch2',
      label: 'branch2',
    },
    {
      value: 'branch3',
      label: 'branch3',
    },
  ];

    
const NewPullRequest = () =>{
    
    const [baseBranch, setBaseBranch] = React.useState('');
    const [headBranch, setHeadBranch] = React.useState('');

    const handleBaseBranchChange = (event) => {
      setBaseBranch(event.target.value);
    };
    const handleHeadBranchChange = (event) => {
        setHeadBranch(event.target.value);
    }
    return (
        <section className="pull-request-form">
            <h1 className="pull-request-title"> New Pull Request </h1>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },                
            }}
            noValidate
            autoComplete="off"
            >
            <div>
            <TextField
            id="standard-select-currency-native"
            select
            label="Base Branch"
            value={baseBranch}
            onChange={handleBaseBranchChange}
            SelectProps={{
                native: true,
            }}
            helperText="Please select your base branch"
            variant="standard"
            >
            {branches.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </TextField>
            <TextField
            id="standard-select-currency-native"
            select
            label="Head Branch"
            value={headBranch}
            onChange={handleHeadBranchChange}
            SelectProps={{
            native: true,
            }}
            helperText="Please select head branch"
            variant="standard"
        >
            {branches.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </TextField>
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                />
               
            </div>
            <div>
            <TextField
            id="standard-multiline-static"
            required
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            variant="standard"
            />
            </div>
            <div>
                <Button>Create</Button>
                <Button>Create And Merge</Button>
            </div>
            </Box>
        </section>
    )



   
}

export default NewPullRequest;