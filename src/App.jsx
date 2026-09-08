import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Token from "./pages/Token";
import Ballot from "./pages/Ballot";
import Receipt from "./pages/Receipt";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        
        <Route
          path="/token"
          element={<Token />}
        />
        
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/ballot"
          element={<Ballot />}
        />

        <Route
          path="/receipt"
          element={<Receipt />}
        />
         
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;