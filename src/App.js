import React,{ useContext, useState } from 'react';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Login from './views/Login';
import './App.css';
import Main from './views/Main';
import Register from './views/Register';
import Customer from './views/customer';
import Admin from './views/admin';
import {useLocalStorage} from './hooks';

export const TokenContext = React.createContext()

function App() {

  const [token,setToken] = useLocalStorage('token',localStorage.getItem('token'))

  return (
    <TokenContext.Provider value={[token,setToken]}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />  
                <Route path="customer" element={<Customer.Home />}>
                    <Route path="services" element={<Customer.Services />} />
                    <Route path="licence/:licenceId/logbook" element={<Customer.LogBook />} />
                </Route>   
                <Route path="admin" element={<Admin.Home />}>
                    <Route path="licence/issue" element={<Admin.IssueLicence />} />
                    <Route path="customer/:customerId/licence" element={<Admin.Licence />} />
                </Route>     
              </Route>
          </Routes>      
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;