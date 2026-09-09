
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} AI Research Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
