const BranchesRepository = require('./branches');
const gitBranchMockData = [
    {
      "name": "main",
      "commit": {
        "sha": "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
      },
      "protected": true,
      "protection": {
        "required_status_checks": {
          "enforcement_level": "non_admins",
          "contexts": [
            "ci-test",
            "linter"
          ]
        }
      },
      "protection_url": "https://api.github.com/repos/octocat/hello-world/branches/master/protection"
    }
  ];
const mockError = {
    response: {
        status: 404,
        data: {
            message: "branch not found"
        }
    }
}
const owner = 'hugomontero';
const repo = 'fullstack-interview-test';
describe('branches repository', () => {
    let branchesRepository, axiosInstance;
    describe('all branches', () => {
        beforeEach(() => {
            axiosInstance = jest.fn();
            branchesRepository = BranchesRepository(axiosInstance);
        })
        it('return all branches from an specific repo', async() => {
            axiosInstance.get = jest.fn(()=>{
                return {data: gitBranchMockData }
            });
            const branches = await branchesRepository.getAllBranches(owner, repo);
            expect(branches).toEqual(gitBranchMockData);
            expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/branches');
        });
        
        it('fails when we cant find the repo', async() => {
          let error;
          axiosInstance.get = jest.fn(()=>{
            throw mockError;
          });
          try{
            await branchesRepository.getAllBranches(owner, repo);
          }catch(_error) {
            error = _error;
          }
          expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/branches');
          expect(error).toEqual(mockError);
        });
    });

    describe('get branch By Name', () => {
        it('returns all branches from a specific branch', async() => {
          axiosInstance.get = jest.fn(() => {
            return { data: gitBranchMockData[0] };
          });
          const branch = await branchesRepository.getBranchByName(owner, repo, 'main');
          expect(branch).toEqual(gitBranchMockData[0]);
          expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/branches/main');
        });
    
        it('fails when we look for an inexistent branch', async()=>{
          let error;
          axiosInstance.get = jest.fn(()=>{
            throw mockError;
          });
          try{
            await branchesRepository.getBranchByName(owner, repo, 'main');
          }catch(_error) {
            error = _error;
          }
          expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/branches/main');
          expect(error).toEqual(mockError);
        });
    });    
});