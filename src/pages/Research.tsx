
import React from 'react';
import Header from '@/components/Header';
import ResearchForm from '@/components/ResearchForm';

const Research = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-lexend font-bold text-research-800 mb-4">
            Generate Your Research Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your topic and preferences below, and our AI will create a comprehensive, 
            well-structured research report in seconds.
          </p>
        </div>
        
        <ResearchForm />
      </div>
    </div>
  );
};

export default Research;
