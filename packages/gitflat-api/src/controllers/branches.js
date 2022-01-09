const BranchService = (repository, owner, repo) => {
    const getBranches = async () => {
        return repository.getAllBranches(repo, owner);
    };
    
    const getBranchByName = async(branchName) => {
        return repository.getBranchByName(repo, owner, branchName);
    };

    return { 
        getBranches,
        getBranchByName
    }
}

module.exports = BranchService