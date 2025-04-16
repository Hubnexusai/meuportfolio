import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AgentGrid from '../components/AgentGrid';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import NeuralBackground from '../components/NeuralBackground';
import FloatingParticles from '../components/FloatingParticles';
import SkyParticles from '../components/SkyParticles';

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #000935;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(0, 204, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  overflow-x: hidden;
  position: relative;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <NeuralBackground />
      <FloatingParticles />
      <SkyParticles />
      <Header />
      <Hero />
      <AgentGrid />
      <Features />
      <CTA />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
