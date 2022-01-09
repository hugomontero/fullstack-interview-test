const BranchService = (repository, owner, repo) => {
    const getBranches = async () => {
        return repository.getAllBranches(repo, owner);
    };
    
    const getBranchById = async(branchName) => {
        return repository.getBranchById(repo, owner, branchName);
    };

    return { 
        getBranches,
        getBranchById
    }
}

module.exports = BranchService