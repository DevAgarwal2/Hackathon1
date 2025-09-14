"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Lock } from "lucide-react" 

const cards = [
  { 
    id: 1, 
    title: "AI Photography", 
    description: "Generate photorealistic backgrounds for your products.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&auto=format", 
    status: 'available', 
    href: '/dashboard/create' 
  },
  { 
    id: 2, 
    title: "AI Product Staging", 
    description: "Place your products in virtual, realistic scenes.",
    
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
   status: 'coming_soon', 
    href: '/dashboard/create' 
  },
  { 
    id: 3, 
    title: "Background Remover", 
    description: "Instantly remove the background from any image.",
   
    image: "/image1.jpg",
    status: 'coming_soon', 
    href: '#' 
  },

  { 
    id: 4, 
    title: "Showcase Videos", 
    description: "Create stunning short videos for your products.",
    
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    status: 'coming_soon', 
    href: '#' 
  },
  { 
    id: 5, 
    title: "Product Packaging", 
    description: "Create stunning, realistic product packaging mockups with AI.",
    
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    status: 'coming_soon', 
    href: '#' 
  },
]

export default function Dashboardcomp() {
  return (
    <div className=" min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Creator Studio</h1>
          <p className="mt-2 text-lg text-slate-600">
            Choose a tool to start creating amazing content for your products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card) => {
            const isComingSoon = card.status === 'coming_soon';

            const CardUI = (
              <Card className="w-full rounded-xl border border-slate-200 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 relative">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isComingSoon ? 'grayscale' : ''}`}
                    />
                  </div>
                  {isComingSoon && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Lock size={12} />
                      Coming Soon
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 bg-white rounded-b-xl">
                  <div>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      {card.title}
                    </CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{card.description}</p>
                  </div>
                </CardFooter>
              </Card>
            );

            return isComingSoon ? (
              <div key={card.id} className="cursor-not-allowed group">
                {CardUI}
              </div>
            ) : (
              <Link href={card.href} key={card.id} className="group block transform transition-transform duration-300 hover:-translate-y-1">
                {CardUI}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}