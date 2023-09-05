import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import SalaryForm from './pages/SalaryForm';
import SalaryForm2 from './pages/SalaryForm2';

function App() {
    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Header />
                <Link to="/">Home</Link>
                <Link to="/salary">Fill up Salary form</Link>
                <Link to="/salary2">Salary2</Link>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/salary" element={<SalaryForm />} />
                    <Route path="/salary2" element={<SalaryForm2 />} />
                </Routes>
                <Footer />
            </>
        </BrowserRouter>
    );
}

export default App;
