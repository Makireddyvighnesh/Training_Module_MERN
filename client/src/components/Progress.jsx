// // ProgressPopup.jsx
// import { useState, useEffect } from 'react';
// import { fetchUserProgress } from '../services/userService'; // Service to fetch user progress
// import './Progress.css';

// const ProgressPopup = () => {
//   const [progress, setProgress] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const getProgress = async () => {
//       try {
//         const data = await fetchUserProgress();
//         setProgress(data.progressPercentage);
//       } catch (error) {
//         console.error('Error fetching progress:', error);
//       }
//     };

//     getProgress();
//   }, []);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   return (
//     <div>
//       <button onClick={toggleVisibility} className="progress-button">
//         🎯 Progress
//       </button>
//       {isVisible && (
//         <div className="progress-popup">
//           <h4>Video Progress</h4>
//           <p>{progress}% completed</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgressPopup;
