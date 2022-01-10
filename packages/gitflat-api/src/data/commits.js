const CommitsRepository = (axiosInstance) => {

    const getCommitsByBranch = async (owner, repo, branchName) => {
        const response = await axiosInstance.get(`/${owner}/${repo}/commits?sha=${branchName}`);
        return response.data;
    };

    const getCommitBySha = async(owner, repo, commitSha) => {
        const response = await axiosInstance.get(`/${owner}/${repo}/commits/${commitSha}`);
        return response.data;
    }

    return {
        getCommitsByBranch,
        getCommitBySha
    }
}


module.exports = CommitsRepository