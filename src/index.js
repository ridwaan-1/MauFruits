import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import store from './ReduxStore';
import Loader from './Components/Loader';
import OrderConfirmation from './Pages/Checkout/OrderConfimation';


const Home = lazy(() => import('./Pages/Home'));
const Market = lazy(() => import('./Pages/Market'));
const Contact = lazy(() => import('./Pages/Contact'));
const AuthPage = lazy(() => import('./Pages/AuthPage'));
const Checkout = lazy(() => import('./Pages/Checkout'));
const Addresses = lazy(() => import('./Pages/Addresses'));

const root = ReactDOM.createRoot(document.getElementById('maufruits-root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<App />}>
            <Route path="market" element={<Market />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="signup" element={<AuthPage signup />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout-success" element={<OrderConfirmation success/>} />
            <Route path="checkout-fail" element={<OrderConfirmation/>} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
