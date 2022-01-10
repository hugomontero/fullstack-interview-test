const CommitsRepository = require('./commits');
const mockData = []
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

describe('commits repository', () => {
    let axiosInstance, commitsRepository;
    beforeEach(() => {
        axiosInstance = jest.fn();
        commitsRepository = CommitsRepository(axiosInstance);
    });

    describe('get all commits from branch', () => {
        it('return all commits from an specific branch', async() => {
            axiosInstance.get = jest.fn(()=>{
                return {data: mockData }
            });
            const commits = await commitsRepository.getCommitsByBranch(owner, repo, 'main');
            expect(commits).toEqual(mockData);
            expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/commits?sha=main');
        });
        
        it('fails when we cant find the repo', async() => {
          let error;
          axiosInstance.get = jest.fn(()=>{
            throw mockError;
          });
          try{
            await commitsRepository.getCommitsByBranch(owner, repo, 'main');
          }catch(_error) {
            error = _error;
          }
          expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/commits?sha=main');
          expect(error).toEqual(mockError);
        });
    });
    describe('get specific commit', () => {
        it('return an specific commit from sha', async() => {
            axiosInstance.get = jest.fn(()=>{
                return {data: mockData }
            });
            const commits = await commitsRepository.getCommitBySha(owner, repo, 'sha');
            expect(commits).toEqual(mockData);
            expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/commits/sha');
        });
        
        it('fails when we cant find the repo', async() => {
          let error;
          axiosInstance.get = jest.fn(()=>{
            throw mockError;
          });
          try{
            await commitsRepository.getCommitBySha(owner, repo, 'sha');
          }catch(_error) {
            error = _error;
          }
          expect(axiosInstance.get).toHaveBeenCalledWith('/hugomontero/fullstack-interview-test/commits/sha');
          expect(error).toEqual(mockError);
        });
    })
});