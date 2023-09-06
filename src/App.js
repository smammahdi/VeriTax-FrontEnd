import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SalaryForm from './pages/SalaryForm';
import Login from './pages/Login';
import Layout from './components/Layout';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';

import BasicInfo from './pages/BasicInfo';
function App() {
    return (
        <>
            <Navbar />
            <Header />
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route path="/" element={<Main />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* <Route element={<RequireAuth />}> */}
                    <Route path="/basicinfo" element={<BasicInfo />} />
                    <Route path="/salary" element={<SalaryForm />} />
                    {/* </Route> */}
                </Route>
            </Routes>
        </>

    );
}

export default App;
