import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import './App.css';
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
