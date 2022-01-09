const BranchRepository = (axiosInstance) => {
  const getAllBranches = async (owner, repo) => {

    const response = await axiosInstance.get(`/${owner}/${repo}/branches`);
    return response.data;
  }
  
  const getBranchByName = async (owner, repo, branchName) => {
    const response = await axiosInstance.get(`/${owner}/${repo}/branches/${branchName}`)
    return response.data;
  }
  return {
    getAllBranches,
    getBranchByName
  }
}
module.exports = BranchRepository;