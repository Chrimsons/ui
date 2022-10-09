import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import "./App.css";
import Main from "./views/Main";
import Register from "./views/Register";
import Customer from "./views/customer";
import Admin from "./views/admin";
import { useLocalStorage } from "./hooks";

export const TokenContext = React.createContext();

function App() {
  const [token, setToken] = useLocalStorage(
    "token",
    localStorage.getItem("token")
  );

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {/* Account Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Routes */}
          <Route path="/customer/services" element={<Customer.Services />} />
          <Route
            path="/customer/licence/:licenceId/logbook"
            element={<Customer.LogBook />}
          />
          <Route
            path="/customer/licence/:licenceId/logform"
            element={<Customer.LogForm />}
          />
          
          {/* Admin Routes */}
          <Route path="/admin/customer/prov" element={<Admin.Provisional />} />
          <Route path="/admin/licence/issue" element={<Admin.IssueLicence />} />
          <Route
            path="/admin/customer/:customerId/licence"
            element={<Admin.Licence />}
          />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
