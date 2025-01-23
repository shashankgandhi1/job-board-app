import './App.css';
import JobsPage from './page/JobsPage';
import LoginPage from './page/LoginPage';

function App() {

  const path = window.location.pathname;

  switch(path) {
    case "/":
      return <LoginPage/>
    case "/login":
      return <LoginPage/>
    case "/jobs":
      return <JobsPage/>
    default:
      return <>404 not found</>

  }
}

export default App;
