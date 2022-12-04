import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { apiClientFactory } from './shared/ApiClientFactory'
import { clientInstance } from './shared/AxiosClient';
import { ServiceFactory } from './services/ServiceFactory'
import { BrowserRouter } from 'react-router-dom';
import { DepsProvider } from './shared/context/DependencyContext'
import { AuthProvider } from './shared/context/AuthContext'

const apiClient = apiClientFactory(clientInstance);
const services = ServiceFactory(apiClient)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DepsProvider services={services}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DepsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
