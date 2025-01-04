import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import AddTask from "./Components/Task/AddTask";
import UpdatePassword from "./Components/User/UpdatePassword";
import Profile from "./Components/User/Profile";
import Dashboard from "./Components/User/Dashboard";
import ListsTask from "./Components/Task/ListsTask";
import UpdateTask from "./Components/Task/UpdateTask";
import { useSelector } from "react-redux";
import AuthRoute from "./Components/Auth/authRoute";
import Footer from "./Components/User/Footer";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update-password"
          element={
            <AuthRoute>
              <UpdatePassword />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <AuthRoute>
              <AddTask />
            </AuthRoute>
          }
        />
        <Route
          path="/lists-task"
          element={
            <AuthRoute>
              <ListsTask />
            </AuthRoute>
          }
        />
        <Route
          path="/update-task/:id"
          element={
            <AuthRoute>
              <UpdateTask />
            </AuthRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
