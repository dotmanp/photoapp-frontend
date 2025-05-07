import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Creator from './components/Creator';
import Feed from './components/Feed';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/feed" element={<Feed />} />

      </Routes>
    </Router>
  );
};

export default App;

// import React from 'react';

// function App() {
//   console.log('Tailwind CSS is working!');
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
//         <h1 className="text-2xl font-bold text-blue-600 mb-2">🎉 Tailwind is Working!</h1>
//         <p className="text-gray-600 mb-4">This box is styled using Tailwind CSS.</p>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//           Test Button
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
