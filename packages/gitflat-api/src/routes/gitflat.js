const express = require('express');
const BranchService = require('../controllers/branches');
const BranchRepository = require('../data/branches');
const CommitsService = require('../controllers/commits');
const CommitsRepository = require('../data/commits');

const router = express.Router();
const axiosInstance = require('../lib/axios');
const branchRepository = BranchRepository(axiosInstance);
const commitsRepository = CommitsRepository(axiosInstance);

const OWNER = process.env.GIT_OWNER  || 'hugomontero';
const REPO = process.env.GIT_REPO || 'fullstack-interview-test';
const branchService = BranchService(branchRepository, OWNER, REPO);
const commitsService = CommitsService(commitsRepository, OWNER, REPO);


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
        res.status(error.response.status || 500).send(error.response.data);
    }
});

router.get('/branches/:branchName/commits', async(req, res) => {
    try {
        const { branchName } = req.params;
        const commits = await commitsService.getCommitsByBranch(branchName);
        res.send(commits);
    }catch(error) {
        res.status(error.response.status || 500).send(error.response.data);
    }
});

router.get('/branches/:branchName/commits/:commitSha', async(req, res) => {
    try {
        const { commitSha } = req.params;
        const commits = await commitsService.getCommitBySha(commitSha);
        res.send(commits);
    }catch(error) {
        res.status(error.response.status || 500).send(error.response.data);
    }
});

router.get('/prs', (req, res) => {});
router.post('/prs', (req, res) => {});
router.get('/prs/:prId', (req, res) => {});
router.put('/prs/:prId', (req, res) => {});


module.exports = router;