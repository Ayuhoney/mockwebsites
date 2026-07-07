import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import About from './components/About';
import Numbers from './components/Numbers';
import Treatments from './components/Treatments';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <About />
      <Numbers />
      <Treatments />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
}
