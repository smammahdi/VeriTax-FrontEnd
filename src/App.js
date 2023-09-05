import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SalaryForm from './pages/SalaryForm';
import BasicInfo from './pages/BasicInfo';

function App() {
    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Header />
                <Link to="/">Home</Link>
                <Link to="/salary">Fill up Salary form</Link>
                <Link to="/basic-info">Basic Info</Link>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/salary" element={<SalaryForm />} />
                    <Route path="/basic-info" element={<BasicInfo />} />
                </Routes>
                <Footer />
            </>
        </BrowserRouter>
    );
}

export default App;
