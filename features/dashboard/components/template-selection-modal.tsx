"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
    ChevronRight,
    Search,
    Star,
    Code,
    Server,
    Zap,
    Clock,
    Check,
    Plus,
    Globe,
    Radio,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type TemplateSelectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
        description?: string;
    }) => void;
};


interface TemplateOption { 
    id: string,
    name: string,
    description: string,
    icon: string,
    color: string,
    popularity: number,
    tags: string[];
    features: string[],
    category: "frontend" | "backend" | "fullstack"
}


const templates: TemplateOption[] = [
    {
        id: "react",
        name: "React",
        description: "A Javascript library for building user interfaces with component-based architecture",
        icon: "/react.svg",
        color: "#61DAFB",
        popularity: 5,
        tags: ["frontend", "javascript", "ui"],
        features: ["Component-based", "Virtual DOM", "JSX Support"],
        category: "frontend",
    },

    {
        id: "angular",
        name: "Angular",
        description: "Angular is a web framework that empowers developers to build fast, reliable applications.",
        icon: "/angular.svg",
        color: "#DD0031",
        popularity: 3,
        tags: ["frontend", "React", "framework"],
        features: [
            "Reactive Data Binding",
            "Component System",
            "Virttual DOM",
            "Dependency Injection",
            "TypeScript Support",
        ],
        category: "fullstack",
    },

    {
     id:"hono",
     name: "Hono",
     description: "Fast, lightweight, build Web Standards Support for any JavaScript runtime",
     icon: "/hono.svg",
     color: "#F529A3",
     popularity: 3,
     tags: ["Node.js", "TypeScript", "Backend"],
     features: [
        "Dependency Injection",
        "TypeScript Support",
        "Modular Architecture",
     ],
     category: "backend",    
    },

    { 
      id: "vue",
      name: "Vue.js",
      description: "Progressive Javascript framework foe building user interfaces with an approachable learning curve",
      icon: "/vue.svg",
      color: "#42b883",
      popularity: 4,
      tags: ["frontend", "javascript", "ui"],
      features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
      category: "frontend",
    },

    {
        id: "next-js",
        name: "Next.js",
        description: "The React framework for production with server-side rendering and static site generation",
        icon: "/nextjs.svg",
        color: "#000000",
        popularity: 5,
        tags: ["React", "SSR", "Fullstack"],
        features: ["Server-side Rendering", "File-based Routing", "API Routes"],
        category: "fullstack",
    },

    {
        id: "express",
        name: "Express",
        description: "Fast, unopinionated, minimalist web framework for Node js to build APIs and web applications",
        icon: "/express.svg",
        color: "#000000",
        popularity: 4,
        tags: ["Node.js", "API", "Backend"],
        features: ["Middleware", "Routing", "HTTP Utilities"],
        category: "backend",
    }
]

const TemplateSelectionModal = ({ isOpen, onClose, onSubmit }: TemplateSelectionModalProps) => {

    const [step, setStep] = useState<"select" | "configure">("select");
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState<"all" | "frontend" | "backend" | "fullstack">("all")
    const [projectName, setProjectName] = useState("");

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose()

                setStep("select");
                setSelectedTemplate(null);
                setProjectName("");
            }
        }}>
            <DialogContent className='sm:max-w-[800px] max-h-[90] overflow-y-auto'>
                {
                    step === "select" ? ( 
                <>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold text-[#F529A3] flex items-center gap-2'>
                            <Plus size={24} className='text-[#F529A3]' />
                            Select Template
                        </DialogTitle>
                        <DialogDescription>
                            Choose a template to create your new playground
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-6 py-4'>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='relative flex-1'>
                                <Search
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 outline-none'
                                size={18} />
                               <Input
                               placeholder='Search templates...'
                               value={searchQuery}
                               onChange={(e)=>setSearchQuery(e.target.value)}
                               className='p1-10'
                                />
                            </div>
                            <Tabs defaultValue='all' className='w-full sm:w-auto' onValueChange={(value)=>setCategory(value as any)}>
                                 <TabsList className='grid grid-cols-4 w-full sm:w-[auto]'>
                                    <TabsTrigger value='all'>All</TabsTrigger>
                                    <TabsTrigger value='frontend'>Frontend</TabsTrigger>
                                    <TabsTrigger value='backend'>Backend</TabsTrigger>
                                    <TabsTrigger value='fullstack'>Fullstack</TabsTrigger>
                                 </TabsList>
                            </Tabs>
                        </div>
                        <RadioGroup value={selectedTemplate || ""} onValueChange={handleSelectTemplate}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                               
                            </div>
                        </RadioGroup>
                    </div>
                </>) : (
                <></>
                )}
            </DialogContent>

        </Dialog>
    )
}

export default TemplateSelectionModal