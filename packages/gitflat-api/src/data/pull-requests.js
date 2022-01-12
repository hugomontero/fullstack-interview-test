const PullRequestsRepository = (axiosInstance) => {

    const createPullRequest = async(owner, repo, pullOptions) => {
        const { title, head, base, description: body} = pullOptions;
        const pullRequestResponse = await axiosInstance.post(`/${owner}/${repo}/pulls`, {
            title,
            head,
            base,
            body
        });
        return pullRequestResponse.data;
    };

    const mergePullRequest = async (owner, repo, pullNumber) => {
        const mergeResponse = await axiosInstance.put(`/${owner}/${repo}/pulls/${pullNumber}/merge`);
        return mergeResponse.data;
    };

    const closePullRequest = async(owner, repo, pullNumber) => {
        const pullRequestOptions = {
            state: 'closed'
        }
        const closeResponse = await axiosInstance.pacth(`/${owner}/${repo}/pulls/${pullNumber}`, pullRequestOptions);
        return closeResponse.data;
    };

    const getPullRequests = async(owner, repo) => {
        const response = await axiosInstance.get(`/${owner}/${repo}/pulls?state=all`);
        return response.data;

    };

    const getPullRequestByNumber = async(owner, repo, pullNumber) => {
        const response = await axiosInstance.get(`/${owner}/${repo}/pulls/${pullNumber}`);
        return response.data;
    };

    return {
        createPullRequest,
        mergePullRequest,
        closePullRequest,
        getPullRequests,
        getPullRequestByNumber,
    }
}

module.exports = PullRequestsRepository;