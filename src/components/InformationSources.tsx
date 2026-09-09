
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type SourceItem = {
  name: string;
};

type FocusItem = {
  name: string;
};

type IndustrySourceData = {
  sources: SourceItem[];
  focusAreas: FocusItem[];
};

type IndustrySourcesMap = {
  [key: string]: IndustrySourceData;
};

const industrySourcesData: IndustrySourcesMap = {
  "healthcare": {
    sources: [
      { name: "PubMed" },
      { name: "WHO" },
      { name: "NIH" },
      { name: "Harvard Medical Journal" },
      { name: "CDC" },
      { name: "Mayo Clinic" }
    ],
    focusAreas: [
      { name: "AI in diagnostics" },
      { name: "Drug discovery" },
      { name: "Telemedicine" },
      { name: "Patient privacy" },
      { name: "Robotic surgery" }
    ]
  },
  "technology": {
    sources: [
      { name: "IEEE" },
      { name: "ACM Digital Library" },
      { name: "MIT Technology Review" },
      { name: "arXiv" },
      { name: "Google Scholar" }
    ],
    focusAreas: [
      { name: "Machine learning" },
      { name: "Cloud computing" },
      { name: "Quantum computing" },
      { name: "Cybersecurity" },
      { name: "Ethical AI" }
    ]
  },
  "finance": {
    sources: [
      { name: "Bloomberg" },
      { name: "Financial Times" },
      { name: "Wall Street Journal" },
      { name: "Harvard Business Review" },
      { name: "SSRN" }
    ],
    focusAreas: [
      { name: "Algorithmic trading" },
      { name: "Risk assessment" },
      { name: "Market prediction" },
      { name: "Blockchain" },
      { name: "Financial regulation" }
    ]
  },
  "education": {
    sources: [
      { name: "ERIC" },
      { name: "Education Week" },
      { name: "Chronicle of Higher Education" },
      { name: "SAGE Journals" },
      { name: "EdSurge" }
    ],
    focusAreas: [
      { name: "Adaptive learning" },
      { name: "Educational technology" },
      { name: "Online assessment" },
      { name: "Learning analytics" },
      { name: "Digital literacy" }
    ]
  },
  "environmental": {
    sources: [
      { name: "Nature" },
      { name: "Science" },
      { name: "Environmental Science & Technology" },
      { name: "UN Environment Programme" },
      { name: "EPA" }
    ],
    focusAreas: [
      { name: "Renewable energy" },
      { name: "Climate modeling" },
      { name: "Conservation tech" },
      { name: "Sustainable development" },
      { name: "Carbon capture" }
    ]
  }
};

interface InformationSourcesProps {
  industry: string;
}

const InformationSources: React.FC<InformationSourcesProps> = ({ industry }) => {
  // Default to healthcare if no match
  const industryKey = industry?.toLowerCase().includes('health') ? 'healthcare' :
                      industry?.toLowerCase().includes('tech') ? 'technology' :
                      industry?.toLowerCase().includes('finance') ? 'finance' :
                      industry?.toLowerCase().includes('educat') ? 'education' :
                      industry?.toLowerCase().includes('environ') ? 'environmental' : 'healthcare';
  
  const sourceData = industrySourcesData[industryKey];
  
  if (!sourceData) return null;
  
  return (
    <Card className="mt-6 border-t-4 border-t-research-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Industry Information Sources</CardTitle>
        <CardDescription>
          Research will be compiled from authoritative sources in this industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-research-700">Sources</h4>
            <ul className="space-y-1 text-sm">
              {sourceData.sources.map((source, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-research-500 mr-2"></span>
                  {source.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-research-700">Focus Areas</h4>
            <ul className="space-y-1 text-sm">
              {sourceData.focusAreas.map((area, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-research-500 mr-2"></span>
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationSources;
