import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav-bar/nav-bar';
import Branches from './components/branches/branches';
import Commits from './components/commits/commits';
import PullRequests from './components/pull-requests/pull-requests';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import NewPullRequest from './components/new-pull-request/new-pull-request';

function App() {
  return (
    <>
      <NavBar />
      <section className='content'>
        <Router>
          <Routes>          
            <Route exact path="/" caseSensitive={false} element={<Branches />} />
            <Route exact path="/branches" caseSensitive={false} element={<Branches />} />
            <Route exact path="/branches/:name/commits" caseSensitive={false} element={<Commits />} />
            <Route exact path="/pull-requests" caseSensitive={false} element={<PullRequests />} />
            <Route exact path="/pull-requests/new" caseSensitive={false} element={<NewPullRequest />} />
          </Routes>
      
        </Router>
      </section>
    </>
  );
}

export default App;
