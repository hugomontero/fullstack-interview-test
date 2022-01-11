const PULL_REQUEST_ACTION = {
    OPEN: 'open',
    MERGE: 'merge'
}

const validActions = [PULL_REQUEST_ACTION.OPEN, PULL_REQUEST_ACTION.MERGE]

const validatePullOptions = (pullOptions) => {
    if (!pullOptions)
        throw new Error('You have to add head, base, title, description and a valid action');

    const { head, base, title, description, action } = pullOptions;

    if(!head || !base || !title || !description) 
        throw new Error('You have to add head, base, title, description and a valid action');

    if(!validActions.includes(action))
        throw new Error('Please pick a valid action: open, merge');
}

const PullRequestsService = (repository, owner, repo) => {
    const createPullRequest = async(pullOptions ) => {
        validatePullOptions(pullOptions);        
        const pullRequest = await repository.createPullRequest(owner, repo, pullOptions);

        if(pullOptions.action === PULL_REQUEST_ACTION.MERGE){
            const merged = await repository.mergePullRequest(owner, repo, pullRequest.number);
            return { ...pullRequest, merged};
        }
        return pullRequest;
    }

    const getPullRequests = async() => {
        return repository.getPullRequests(owner, repo);
    }

    const getPullRequestByNumber = async(pullNumber) => {
        return repository.getPullRequestByNumber(owner, repo, pullNumber);
    }

    const closePullRequest = async(pullNumber) => {
        return repository.closePullRequest(owner, repo, pullNumber);        
    }

    return {
        createPullRequest,
        closePullRequest,
        getPullRequestByNumber,
        getPullRequests
    }
}

module.exports = PullRequestsService;