import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Main() {
  return (
    <>
      
      <main>
        {/* <Header /> */}
        <Services />
        <About />
        <Contact />

      </main>
      <Footer />
    </>
  );
}
export default Main;
