// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Interview from "./components/Interview";
import Navbar from "./components/Navbar";

// import Interview from "./pages/Interview"; // Example page
// import Register from "./pages/Register";   // Example page
// import Login from "./pages/Login";         // Example page

function App() {
  return <Interview />;
}

export default App;
