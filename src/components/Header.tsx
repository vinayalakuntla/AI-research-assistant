
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-research-800 text-white backdrop-blur supports-[backdrop-filter]:bg-research-800/90">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-research-300" />
          <span className="font-lexend font-bold text-xl text-white">AI Research Assistant</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-research-300 transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/research" className="text-sm font-medium text-research-300 transition-colors hover:text-white">
            Research
          </Link>
          <Link to="/about" className="text-sm font-medium text-research-300 transition-colors hover:text-white">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="gap-2 bg-research-400 hover:bg-research-500 text-white">
            <Search className="h-4 w-4" />
            <span>New Research</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
