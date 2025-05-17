
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Benefits } from '@/components/landing/Benefits';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { Advantages } from '@/components/landing/Advantages';
import { BusinessTypes } from '@/components/landing/BusinessTypes';
import { Pricing } from '@/components/landing/Pricing';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we're scrolled at all
      setIsScrolled(currentScrollY > 10);
      
      // Determine header visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative bg-white">
      <Header isScrolled={isScrolled} visible={headerVisible} />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <BusinessTypes />
      <Advantages />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
