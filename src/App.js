import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SalaryForm from './pages/SalaryForm';
import Login from './pages/Login';
import BasicInfo from './pages/BasicInfo';
import ProfileUpdate from './pages/ProfileUpdate';

function App() {
    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Header />
                <Link to="/">Home</Link>
                <Link to="/salary">Salary</Link>
                <Link to="/basic-info">Basic Info</Link>
                <Link to="/profile-update">Profile Update</Link>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/salary" element={<SalaryForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/basic-info" element={<BasicInfo />} />
                    <Route path="/profile-update" element={<ProfileUpdate />} />
                </Routes>
                <Footer />
            </>
        </BrowserRouter>
    );
}

export default App;
