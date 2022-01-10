const CommitsService = (repository, owner, repo) => {
    const getCommitsByBranch = async (branchName) => {
        return repository.getCommitsByBranch(owner, repo, branchName);
    }

    const getCommitBySha = async (commitSha) => {
        return repository.getCommitBySha(owner, repo, commitSha);
    }
    return {
        getCommitsByBranch,
        getCommitBySha
    }
}



module.exports = CommitsService