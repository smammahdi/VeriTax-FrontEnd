import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SalaryForm from './pages/SalaryForm';

function App() {
    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Header />
                <Link to="/">Home</Link>
                <Link to="/salary">Salary</Link>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/salary" element={<SalaryForm />} />
                </Routes>
                <Footer />
            </>
        </BrowserRouter>
    );
}

export default App;
