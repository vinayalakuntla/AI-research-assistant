import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Copy, Share2, Printer, BookOpen, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Format citation based on selected style
const formatCitation = (reference: any, style: string) => {
  if (style === 'APA') {
    return `${reference.authors} (${reference.year}). ${reference.title}. ${reference.journal ? reference.journal + '.' : ''}`;
  } else if (style === 'MLA') {
    return `${reference.authors}. "${reference.title}." ${reference.journal ? reference.journal + ',' : ''} ${reference.year}.`;
  } else if (style === 'Chicago') {
    return `${reference.authors}. "${reference.title}." ${reference.journal ? reference.journal : ''} (${reference.year}).`;
  } else if (style === 'Harvard') {
    return `${reference.authors} ${reference.year}, '${reference.title}', ${reference.journal ? reference.journal + '.' : ''}`;
  }
  return '';
};

const ResearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('complete');
  
  // Get form data and research data from location state
  const formData = location.state?.formData || {
    topic: 'Artificial Intelligence in Healthcare',
    citationStyle: 'APA',
    includeSummary: true,
    includeDetails: true,
    includeStatistics: true,
    includeExpertOpinions: true
  };
  
  // Get research data from location state or use default
  const research = location.state?.researchData || {
    title: `${formData.topic}: Comprehensive Analysis`,
    introduction: "No research data available. Please go back and try again.",
    detailedInsights: [],
    keyStatistics: [],
    expertOpinions: [],
    conclusion: "",
    references: []
  };

  const handleCopyToClipboard = () => {
    const contentElement = document.getElementById('research-content');
    if (contentElement) {
      navigator.clipboard.writeText(contentElement.innerText)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "The research report has been copied to your clipboard",
          });
        })
        .catch(err => {
          toast({
            title: "Failed to copy",
            description: "There was an error copying the content",
            variant: "destructive"
          });
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a Blob containing the research data
    const jsonData = JSON.stringify(research, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-${formData.topic.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download complete",
      description: "Your research report has been downloaded",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here",
    });
  };

  return (
    <div className="container max-w-5xl py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/research')}
        className="mb-6 gap-1 text-research-700 hover:text-research-800 hover:bg-research-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Research
      </Button>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="research-heading text-2xl">{research.title}</h1>
            <p className="text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="complete" onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b border-gray-200">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="complete" className="flex gap-2">
                <FileText className="h-4 w-4" />
                Complete Report
              </TabsTrigger>
              <TabsTrigger value="summary" className="flex gap-2">
                <BookOpen className="h-4 w-4" />
                Summary
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="complete" className="m-0">
            <ScrollArea className="h-[calc(100vh-280px)] p-6" id="research-content">
              <article className="prose prose-blue max-w-none space-y-6">
                <section className="research-section">
                  <h2 className="research-heading text-xl mb-4">Introduction</h2>
                  <p>{research.introduction}</p>
                </section>
                
                {formData.includeDetails && research.detailedInsights && research.detailedInsights.length > 0 && (
                  <section className="research-section">
                    <h2 className="research-heading text-xl mb-4">Detailed Insights</h2>
                    <div className="space-y-4">
                      {research.detailedInsights.map((insight: any, index: number) => (
                        <div key={index}>
                          <h3 className="research-heading text-lg mb-2">{insight.subtitle}</h3>
                          <p>{insight.content}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {formData.includeStatistics && research.keyStatistics && research.keyStatistics.length > 0 && (
                  <section className="research-section">
                    <h2 className="research-heading text-xl mb-4">Key Statistics & Data Points</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {research.keyStatistics.map((stat: string, index: number) => (
                        <li key={index}>{stat}</li>
                      ))}
                    </ul>
                  </section>
                )}
                
                {formData.includeExpertOpinions && research.expertOpinions && research.expertOpinions.length > 0 && (
                  <section className="research-section">
                    <h2 className="research-heading text-xl mb-4">Expert Opinions</h2>
                    <div className="space-y-4">
                      {research.expertOpinions.map((item: any, index: number) => (
                        <div key={index} className="border-l-4 border-research-300 pl-4 py-2">
                          <p className="italic">"{item.opinion}"</p>
                          <p className="text-research-700 font-medium mt-2">— {item.expert}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {research.conclusion && (
                  <section className="research-section">
                    <h2 className="research-heading text-xl mb-4">Conclusion</h2>
                    <p>{research.conclusion}</p>
                  </section>
                )}
                
                {research.references && research.references.length > 0 && (
                  <section className="research-section">
                    <h2 className="research-heading text-xl mb-4">References</h2>
                    <div className="space-y-3 text-sm">
                      {research.references.map((ref: any, index: number) => (
                        <div key={index} className="pl-8 -indent-8">
                          <p>
                            {formatCitation(ref, formData.citationStyle)} 
                            {ref.url && (
                              <a 
                                href={ref.url} 
                                className="text-research-600 hover:underline" 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                Link
                              </a>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="summary" className="m-0">
            <ScrollArea className="h-[calc(100vh-280px)] p-6">
              <article className="prose prose-blue max-w-none">
                <section className="research-section">
                  <h2 className="research-heading text-xl mb-4">Executive Summary</h2>
                  <p>{research.introduction}</p>
                  
                  {research.keyStatistics && research.keyStatistics.length > 0 && (
                    <div className="mt-4">
                      <h3 className="research-heading text-lg mb-2">Key Findings</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {research.keyStatistics.slice(0, 4).map((stat: string, index: number) => (
                          <li key={index}>{stat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {research.conclusion && (
                    <div className="mt-4">
                      <h3 className="research-heading text-lg mb-2">Conclusion</h3>
                      <p>{research.conclusion}</p>
                    </div>
                  )}
                </section>
              </article>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResearchResult;
