
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden bg-white py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-research-50 to-white z-0"></div>
      <div className="absolute top-16 left-4 w-72 h-72 bg-research-100 rounded-full filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-8 right-8 w-96 h-96 bg-research-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-research-200 bg-white px-3 py-1 text-sm">
            <span className="mr-2 rounded-full bg-research-500 px-1.5 py-0.5 text-xs font-semibold text-white">
              NEW
            </span>
            <span className="text-research-800">
              Introducing AI Research Assistant
            </span>
          </div>
          
          <h1 className="font-lexend mb-8 text-4xl font-bold tracking-tight text-research-800 sm:text-6xl">
            Generate comprehensive 
            <span className="relative whitespace-nowrap">
              <span className="relative ml-2 inline-block bg-gradient-to-r from-research-700 to-research-500 bg-clip-text text-transparent">
                research reports
              </span>
            </span>
            <span className="block mt-2">in seconds</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Enter a topic and let our AI do the heavy lifting. Get structured, well-cited research reports with the latest information from around the web.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              size="lg" 
              onClick={() => navigate('/research')}
              className="group gap-2 bg-research-700 hover:bg-research-800 text-white"
            >
              Start Researching
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/about')}>
              Learn more
            </Button>
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="container mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="research-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-research-100 text-research-700 mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="research-heading text-lg">Comprehensive Analysis</h3>
            <p className="mt-2 text-gray-600">
              AI searches the web for the most relevant and up-to-date information from multiple sources.
            </p>
          </div>
          
          <div className="research-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-research-100 text-research-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
              </svg>
            </div>
            <h3 className="research-heading text-lg">Structured Reports</h3>
            <p className="mt-2 text-gray-600">
              Get well-organized research with sections, key points, and proper formatting for easy reading.
            </p>
          </div>
          
          <div className="research-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-research-100 text-research-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <h3 className="research-heading text-lg">Credible Sources</h3>
            <p className="mt-2 text-gray-600">
              All information comes with citations and references to authoritative sources for verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
