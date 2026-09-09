
import React from 'react';
import Header from '@/components/Header';
import { BookOpen, Search, CheckCircle2, Brain, FileCheck, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container py-16 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-research-100 rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-research-700" />
          </div>
          <h1 className="text-4xl font-lexend font-bold text-research-800 mb-4">About AI Research Assistant</h1>
          <p className="text-lg text-gray-600">
            AI Research Assistant is an AI-powered research assistant designed to help you create comprehensive, structured, and credible research reports in seconds.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-lexend font-bold text-research-800 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 rounded-full bg-research-100 items-center justify-center">
                  <span className="text-research-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Enter Your Topic</h3>
                  <p className="mt-1 text-gray-600">
                    Simply enter the research topic you're interested in exploring. You can add specific requirements or focus areas to refine your search.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 rounded-full bg-research-100 items-center justify-center">
                  <span className="text-research-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">AI-Powered Research</h3>
                  <p className="mt-1 text-gray-600">
                    Our advanced AI searches the web for the most relevant and up-to-date information from authoritative sources, analyzes the content, and removes redundant or biased information.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 rounded-full bg-research-100 items-center justify-center">
                  <span className="text-research-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Structured Report Generation</h3>
                  <p className="mt-1 text-gray-600">
                    AI Research Assistant organizes the information into a well-structured research report with proper sections, citations, and references, ready for your use.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-lexend font-bold text-research-800 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-research-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">AI-Powered Analysis</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Our advanced AI analyzes multiple sources to provide comprehensive insights.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Globe className="h-6 w-6 text-research-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Up-to-Date Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Access the latest information from across the web, not limited to a static database.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <FileCheck className="h-6 w-6 text-research-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Proper Citations</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    All information comes with proper citations in your preferred format (APA, MLA, Chicago, or Harvard).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-research-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Customizable Reports</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Choose what to include in your report: summaries, detailed analysis, statistics, or expert opinions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-research-800 text-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-lexend font-bold mb-4">Ready to Start Researching?</h2>
            <p className="mb-6 text-research-100">
              Generate your first research report in seconds and experience the power of AI-assisted research.
            </p>
            <a href="/research" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-research-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-research-500 focus:ring-offset-2">
              <Search className="h-4 w-4 mr-2" />
              Start Researching
            </a>
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-12 mt-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-research-700 mr-2" />
              <span className="font-lexend font-bold text-xl text-research-800">AI Research Assistant</span>
            </div>
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} AI Research Assistant. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Developed by Team 12
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
