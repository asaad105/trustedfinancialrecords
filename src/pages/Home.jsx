import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const IMAGES = {
  hero: 'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/86131adcc_generated_ddd4d22d.png',
  liaison: 'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/b3575518b_generated_a9286698.png',
  values: 'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/76cea9037_generated_1089ec20.png',
  services: [
    'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/ceff8fe62_generated_581650d0.png',
    'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/7f7dd7816_generated_b3e7683c.png',
    'https://media.base44.com/images/public/6a0b953ebf56d6000e73665d/97fbc5292_generated_580cb9c3.png',
  ],
};

export default function Home() {
  return (
    <>
      <HeroSection heroImage={IMAGES.hero} />
      <ServicesSection serviceImages={IMAGES.services} />
      <AboutSection valuesImage={IMAGES.values} />
      <TestimonialsSection />
      <CTASection liaisonImage={IMAGES.liaison} />
    </>
  );
}
