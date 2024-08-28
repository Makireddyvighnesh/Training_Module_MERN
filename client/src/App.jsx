import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
// import Layout from './components/Layout.jsx'; // Import Layout
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Layout from './components/Layout.jsx';
import ProgressPopup from './components/Progress.jsx';

function App() {

  const isAuthenticated = localStorage.getItem('user');
  console.log(isAuthenticated);



  return (
    <Router>
      <Navbar /> 
      <div className="main-content"> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route path="/progress" element={<ProgressPopup/>}/>
          <Route path="/MyLearning" element={<Layout/>}/>
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
