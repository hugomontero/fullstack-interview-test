const express = require('express');
const BranchService = require('../controllers/branches');
const BranchRepository = require('../data/branches');
const CommitsService = require('../controllers/commits');
const CommitsRepository = require('../data/commits');
const PullRequestsService = require('../controllers/pull-requests');
const PullRequestsRepository = require('../data/pull-requests');

const router = express.Router();
const axiosInstance = require('../lib/axios');
const branchRepository = BranchRepository(axiosInstance);
const commitsRepository = CommitsRepository(axiosInstance);
const pullRequestsRepository = PullRequestsRepository(axiosInstance);

const OWNER = process.env.GIT_OWNER  || 'hugomontero';
const REPO = process.env.GIT_REPO || 'fullstack-interview-test';
const branchService = BranchService(branchRepository, OWNER, REPO);
const commitsService = CommitsService(commitsRepository, OWNER, REPO);
const pullRequestsService = PullRequestsService(pullRequestsRepository, OWNER, REPO);


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
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});

router.get('/branches/:branchName/commits', async(req, res) => {
    try {
        const { branchName } = req.params;
        const commits = await commitsService.getCommitsByBranch(branchName);
        res.send(commits);
    }catch(error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});

router.get('/branches/:branchName/commits/:commitSha', async(req, res) => {
    try {
        const { commitSha } = req.params;
        const commits = await commitsService.getCommitBySha(commitSha);
        res.send(commits);
    }catch(error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});

router.get('/pulls', async(req, res) => {
    try {
        const pullRequests = await pullRequestsService.getPullRequests();
        res.send(pullRequests);
    }catch(error) {
        console.log(error);
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});
router.post('/pulls', async (req, res) => {
    try {
        const pullRequest = await pullRequestsService.createPullRequest(req.body);
        res.send(pullRequest);
    }catch(error) {
        console.log(error);
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});
router.get('/pulls/:pullNumber', async(req, res) => {
    try {
        const { pullNumber } = req.params;
        const pullRequest = await pullRequestsService.getPullRequestByNumber(pullNumber);
        res.send(pullRequest);
    }catch(error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});

router.put('/pulls/:pullNumber/close', async(req, res) => {
    try {
        const { pullNumber } = req.params;
        const pullRequest = await pullRequestsService.closePullRequest(pullNumber);
        res.send(pullRequest);
    }catch(error) {
        console.log(error);
        res.status(error.response?.status || 500).send(error.response?.data);
    }
});


module.exports = router;