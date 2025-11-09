import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Portfolio from '@/components/sections/Portfolio';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Reviews />
      <Contact />
    </>
  );
}
