import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './new-pull-request.css';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/gitflat';

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


    
const NewPullRequest = () =>{
    const [branches, setBranches] = React.useState([]);
    const [baseBranch, setBaseBranch] = React.useState('');
    const [headBranch, setHeadBranch] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const branchesUrl = `${API_URL}/branches`
        fetchData(branchesUrl, setBranches, setError);
        console.log(branches);
        
    }, []);

    const handleBaseBranchChange = (event) => {
      setBaseBranch(event.target.value);
    };
    const handleHeadBranchChange = (event) => {
        setHeadBranch(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };
    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleCreatePullRequest = (event) => {
        return createPullRequest()
    }
    const handleCreateAndMergePullRequest = (event) => {
        return createPullRequest(true)
    }
    const createPullRequest = async(merge=false) => {
        const payload = {
            title,
            description: body,
            head: headBranch,
            base: baseBranch,
            action: merge ? 'merge' : 'open'
        };
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        }
        try{
            const result = await fetch(`${API_URL}/pulls`, fetchOptions);
            if(result.status !== 200 && result.statusText) {
                setError(result.statusText);
                return
            }
            const pullRequest = await result.json();
            setSuccess(`Pull request created #${pullRequest.number}`);
        }catch(error) {
            setError(error.message);
        }
        

    }
    return (
        <section className="pull-request-form">
            <h1 className="pull-request-title"> New Pull Request </h1>
            {error &&
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert>
            }
            {success &&
                <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {success}
                </Alert>
            }
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
            label=""
            value={baseBranch}
            onChange={handleBaseBranchChange}
            SelectProps={{
                native: true,
            }}
            helperText="Please select your base branch"
            variant="standard"
            >
            {branches.map((option) => (
                <option key={option.name} value={option.name}>
                {option.name}
                </option>
            ))}
            </TextField>
            <TextField
            id="standard-select-currency-native"
            select
            label=""
            value={headBranch}
            onChange={handleHeadBranchChange}
            SelectProps={{
            native: true,
            }}
            helperText="Please select head branch"
            variant="standard"
        >
            {branches.map((option) => (
            <option key={option.name} value={option.name}>
                {option.name}
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
                onChange={handleTitleChange}
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
            onChange={handleBodyChange}
            />
            </div>
            <div>
                <Button onClick={handleCreatePullRequest}>Create</Button>
                <Button onClick={handleCreateAndMergePullRequest}>Create And Merge</Button>
            </div>
            </Box>
        </section>
    )



   
}

export default NewPullRequest;