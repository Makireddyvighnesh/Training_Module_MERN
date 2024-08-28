import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isAuthenticated = localStorage.getItem('user');
  
  // Retrieve progress data from localStorage
  const completedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];
  const pendingVideos = JSON.parse(localStorage.getItem('pendingVideos')) || [];
  
  // Calculate progress percentage
  const totalVideos = completedVideos.length + pendingVideos.length;
  const completedPercentage = totalVideos > 0 ? (completedVideos.length / totalVideos) * 100 : 0;

  const [showProgress, setShowProgress] = useState(false);

  const handleMouseEnter = () => {
    setShowProgress(true);
  };

  const handleMouseLeave = () => {
    setShowProgress(false);
  };

  return (
    <nav className="navbar" style={{backgroundColor: "#333", padding: "1rem", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000}}>
      <div className="navbar-left">
        <Link to="/" className="logo" style={{fontSize:'2rem'}}>TrainingHub</Link>
        <Link to="/" style={{marginLeft:"20px", marginTop:"30px"}}>Home</Link>
        <Link style={{marginLeft:"20px", marginTop:"30px"}} to="MyLearning">My Learning</Link> 
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/progress" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              style={{position: 'relative'}}
            >
              Progress
              {showProgress && (
                <div className="progress-popup" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}>
                  <p>Progress: {completedPercentage.toFixed(2)}%</p>
                </div>
              )}
            </Link>
            <Link to="/profile">User Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Signin</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
