const BranchService = require('./branches');
describe('branches', () => {
    let repository = jest.fn();
    let branchService;
    beforeEach(() => {
        repository = jest.fn();
        branchService = BranchService(repository, 'owner', 'git_repo_name');
    });
    describe('get all branches', () => {        
        it('returns an array of branches for a specific repo', async() => {
            repository.getAllBranches = jest.fn(() => {
                return [
                    {
                        name: 'main',
                        commit: {
                            sha: 'xyz',
                            url: 'branch_url'
                        },
                        protected: true,
                    }
                ]
            });

            const branches = await branchService.getBranches();
            expect(repository.getAllBranches).toHaveBeenCalledWith('owner', 'git_repo_name');
            expect(branches.length).toBe(1);
        });

        it('raise a not found error when there the repo was not found', async() => {
            let error;
            repository.getAllBranches = jest.fn(() => { throw new Error('Not found'); });
            try{
                const branches = await branchService.getBranches();
            }catch(_error) {
                error = _error;
            }
            expect(repository.getAllBranches).toHaveBeenCalledWith('owner', 'git_repo_name');
            expect(error.message).toEqual('Not found');
        });
    });
});