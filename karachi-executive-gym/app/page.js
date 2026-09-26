import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import About from '@/components/About';
import WhyUs from '@/components/WhyUs';
import Training from '@/components/Training';
import Facilities from '@/components/Facilities';
import LadiesGents from '@/components/LadiesGents';
import JoinCta from '@/components/JoinCta';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <WhyUs />
        <Training />
        <Facilities />
        <LadiesGents />
        <JoinCta />
        <Location />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
