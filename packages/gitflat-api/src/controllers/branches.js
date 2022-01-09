const BranchService = (repository, owner, repo) => {
    const getBranches = async () => {
        return repository.getAllBranches(owner, repo);
    };
    
    const getBranchByName = async(branchName) => {
        return repository.getBranchByName(owner, repo, branchName);
    };

    return { 
        getBranches,
        getBranchByName
    }
}

module.exports = BranchService