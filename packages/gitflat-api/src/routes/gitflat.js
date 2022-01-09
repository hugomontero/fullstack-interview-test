const express = require('express');
const router = express.Router();
const BranchService = require('../controllers/branches');
const branchRepository = require('../data/branches');
const OWNER = process.env.GIT_OWNER  || 'hugomontero';
const REPO = process.env.GIT_REPO || 'fullstack-interview-test';
const branchService = BranchService(branchRepository, OWNER, REPO);

router.get('/branches', async (req, res) => {
    try {
        const branches = await branchService.getBranches();
        res.send(branches);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/branches/:branchName', async (req, res) => {
    try {
        const { branchName } = req.params;
        const branch = await branchService.getBranchByName(branchName);
        res.send(branch);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/branches/:branchName/commits', (req, res) => {});

router.get('/prs', (req, res) => {});
router.post('/prs', (req, res) => {});
router.get('/prs/:prId', (req, res) => {});
router.put('/prs/:prId', (req, res) => {});


module.exports = router;