const express = require('express');
const router = express.Router();

router.get('/branches', (req, res) => {});

router.get('/branches/:branchId/commits', (req, res) => {});

router.get('/branches/:branchId/commits', (req, res) => {});

router.get('/prs', (req, res) => {});
router.post('/prs', (req, res) => {});
router.get('/prs/:prId', (req, res) => {});
router.put('/prs/:prId', (req, res) => {});


module.exports = router;