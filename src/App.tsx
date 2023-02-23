import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateCompany from './pages/CreateCompany';
import { CreateInvoice } from './pages/CreateInvoice';
import { Home } from './pages/Home';
import SearchCompany from './pages/SearchCompany';
import SearchInvoice from './pages/SearchInvoice';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route element={<CreateCompany />} path="/create-comapny" />
        <Route element={<CreateInvoice />} path="/create-invoice" />
        <Route element={<SearchCompany />} path="/search-comapny" />
        <Route element={<SearchInvoice />} path="/search-invoice" />
        <Route element={<Home />} path="/" />

      </Routes>

    </Fragment>
  );
}

export default App;
