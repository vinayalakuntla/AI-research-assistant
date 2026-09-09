
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Switch
} from "@/components/ui/switch";
import { Search, Sparkles, Key, Lock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useOpenAI } from '@/utils/openai';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import InformationSources from './InformationSources';

type FormData = {
  topic: string;
  requirements: string;
  citationStyle: string;
  industry: string;
  includeSummary: boolean;
  includeDetails: boolean;
  includeStatistics: boolean;
  includeExpertOpinions: boolean;
}

const ResearchForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  
  const openAI = useOpenAI();
  
  // Check if API key is already set on component mount
  useEffect(() => {
    if (!openAI.hasApiKey) {
      setApiKeyDialogOpen(true);
    }
  }, [openAI.hasApiKey]);
  
  // Initialize the form
  const form = useForm<FormData>({
    defaultValues: {
      topic: '',
      requirements: '',
      citationStyle: 'APA',
      industry: 'Healthcare & Medical Research',
      includeSummary: true,
      includeDetails: true,
      includeStatistics: true,
      includeExpertOpinions: true
    }
  });

  // Initialize a separate form for the API key dialog
  const apiKeyForm = useForm({
    defaultValues: {
      apiKey: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!data.topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a research topic to continue",
        variant: "destructive"
      });
      return;
    }

    if (!openAI.hasApiKey) {
      setApiKeyDialogOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // Fetch research data from OpenAI with industry context
      const researchData = await openAI.fetchResearchData(data.topic, data.requirements, data.industry);
      
      if (researchData) {
        navigate('/research/results', { 
          state: { 
            formData: data,
            researchData
          } 
        });
      } else if (openAI.error) {
        toast({
          title: "Error",
          description: openAI.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Research generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate research. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      if (openAI.saveApiKey(apiKeyInput.trim())) {
        toast({
          title: "API Key Saved",
          description: "Your OpenAI API key has been saved securely",
        });
        setApiKeyDialogOpen(false);
      }
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive"
      });
    }
  };

  // Watch industry value for showing sources
  const watchIndustry = form.watch("industry");

  return (
    <div className="container py-12 max-w-3xl mx-auto animate-fade-in">
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Connect to OpenAI
            </DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to generate research reports.
              Your key is stored locally in your browser and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              {/* Use a regular Label instead of FormLabel outside of Form context */}
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Get your API key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">OpenAI dashboard</a>.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setApiKeyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={saveApiKey} className="gap-2">
                <Lock className="h-4 w-4" />
                Save API Key
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="research-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="research-heading text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-research-600" />
              New Research
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setApiKeyDialogOpen(true)}
            >
              <Key className="h-4 w-4" />
              {openAI.hasApiKey ? 'Update API Key' : 'Set API Key'}
            </Button>
          </div>
          <CardDescription>
            Enter your topic and preferences to generate a comprehensive research report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="topic">Research Topic</FormLabel>
                    <FormControl>
                      <Input
                        id="topic"
                        placeholder="E.g., Impact of Artificial Intelligence in Healthcare"
                        className="w-full"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be specific to get more focused research results
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="industry">Industry Focus</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Healthcare & Medical Research">Healthcare & Medical Research</SelectItem>
                        <SelectItem value="Technology & AI Development">Technology & AI Development</SelectItem>
                        <SelectItem value="Finance & Business Analytics">Finance & Business Analytics</SelectItem>
                        <SelectItem value="Education & E-Learning">Education & E-Learning</SelectItem>
                        <SelectItem value="Environmental & Sustainability">Environmental & Sustainability</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      Tailors research to industry-specific sources
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Display information sources based on selected industry */}
              <InformationSources industry={watchIndustry} />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="requirements">Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        id="requirements"
                        placeholder="Any specific aspects you want the research to focus on?"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced-options">
                  <AccordionTrigger className="text-sm font-medium">
                    Advanced Options
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <FormField
                        control={form.control}
                        name="citationStyle"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel htmlFor="citation-style">Citation Style</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select citation style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="APA">APA</SelectItem>
                                <SelectItem value="MLA">MLA</SelectItem>
                                <SelectItem value="Chicago">Chicago</SelectItem>
                                <SelectItem value="Harvard">Harvard</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3 mt-4">
                        <FormLabel>Report Components</FormLabel>
                        
                        <FormField
                          control={form.control}
                          name="includeSummary"
                          render={({ field }) => (
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">
                                  Include Summary
                                </FormLabel>
                                <FormDescription>Brief overview of the topic</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="includeDetails"
                          render={({ field }) => (
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">
                                  Include Detailed Analysis
                                </FormLabel>
                                <FormDescription>In-depth exploration of the topic</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="includeStatistics"
                          render={({ field }) => (
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">
                                  Include Key Statistics
                                </FormLabel>
                                <FormDescription>Relevant data points and figures</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="includeExpertOpinions"
                          render={({ field }) => (
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">
                                  Include Expert Opinions
                                </FormLabel>
                                <FormDescription>Quotes and insights from authorities</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button 
                type="submit" 
                className="w-full mt-6 gap-2 bg-research-700 hover:bg-research-800"
                disabled={isLoading || !openAI.hasApiKey}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Research...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Generate Research Report
                  </>
                )}
              </Button>
              
              {!openAI.hasApiKey && (
                <p className="text-center text-sm text-amber-600">
                  Please set your OpenAI API key before generating research
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchForm;
