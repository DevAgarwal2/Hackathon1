"use client";

import AuthButton from "@/component/AuthButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Camera,
  Download,
  Eye,
  Sparkles,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Slider } from "@/component/Slider";

export default function PhotoCraftLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8" />
              <span className="text-2xl font-bold">PhotoCraft</span>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Now Available
            </Badge>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Instantly Create{" "}
              <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Studio-Quality Photos
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0">
              Transform ordinary product shots into scroll-stopping images in
              <span className="font-semibold text-gray-900">
                {" "}
                under 10 seconds
              </span>
              . No studio, no editing skills — just AI magic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-2xl px-8 py-6 text-lg"
              >
                <Link href="/login" className="flex items-center">
                  Start Free
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="rounded-2xl px-8 py-6 text-lg"
              >
                <Eye className="mr-2 h-5 w-5" />
                Watch Demo
              </Button> */}
            </div>
          </motion.div>

          {/* Right Column - Mockup / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-xl flex items-center justify-center">
              {/* <div className="text-center">
                <Camera className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">
                  Product Photo Transformation
                </p>
              </div> */}
              <div className="h-full w-full">
                <Slider />
              </div>
            </div>
            {/* Optional floating badge */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-md px-4 py-2 text-sm font-medium text-blue-700">
              10s Results
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
              All-in-One AI Photo Toolkit
            </h2>
            <p className="text-lg text-gray-700">
              Upload, enhance, and export — everything you need to create
              <span className="font-semibold text-gray-900">
                {" "}
                scroll-stopping visuals{" "}
              </span>
              without the studio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="h-8 w-8 text-blue-600 mb-3" />,
                title: "Seamless Uploads",
                desc: "Drag, drop, and get started instantly — no setup required.",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-blue-600 mb-3" />,
                title: "AI-Powered Enhancements",
                desc: "Lighting, sharpness, and colors perfected — automatically.",
              },
              {
                icon: <Camera className="h-8 w-8 text-blue-600 mb-3" />,
                title: "Background Studio",
                desc: "Swap dull backdrops for professional, brand-ready scenes.",
              },
              {
                icon: <Eye className="h-8 w-8 text-blue-600 mb-3" />,
                title: "Virtual Try-On",
                desc: "Show customers how your product looks before they buy.",
              },
              {
                icon: <Zap className="h-8 w-8 text-blue-600 mb-3" />,
                title: "Blazing Speed",
                desc: "From upload to polished image in under 10 seconds.",
              },
              {
                icon: <Download className="h-8 w-8 text-blue-600 mb-3" />,
                title: "Pixel-Perfect Quality",
                desc: "Export high-resolution images ready for web, print, or ads.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="hover:shadow-xl transition-all duration-300 p-6 rounded-2xl"
              >
                <CardHeader className="space-y-2">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              See the Transformation
            </h2>
            <p className="text-lg text-gray-700">
              From raw product photos to{" "}
              <span className="font-semibold text-gray-900">
                stunning visuals
              </span>{" "}
              — powered by AI.
            </p>
          </div>

          <Card className="p-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Before */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Before
                </h3>
                <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
                  <Image
                    src="/demo_before.jpg"
                    alt="Unedited product photo"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* After (badge placed INSIDE the image wrapper) */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  After
                </h3>

                {/* make this wrapper relative so the badge is positioned over the image */}
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg border-2 border-blue-200">
                  {/* Use `fill` (Next/Image) or width/height — fill makes it fully responsive inside the wrapper */}
                  <Image
                    src="/demo_after.png"
                    alt="Enhanced product photo with AI"
                    fill
                    className="object-cover"
                  />

                  {/* badge is now absolutely positioned relative to the image wrapper */}
                  <span
                    className="absolute top-3 right-3 z-20 inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
                    aria-hidden="true"
                  >
                    ✨ Enhanced with AI
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 py-6 text-lg shadow-lg"
              >
                <Link href="/login" className="flex items-center">
                  Try It Yourself
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
            Boost Sales with Studio-Quality Photos
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Trusted by{" "}
            <span className="font-semibold text-gray-900">100+ businesses</span>
            to create professional product images in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg text-lg px-8 py-6"
            >
              <Link href="/login" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Start Free Today
              </Link>
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg"
            >
              See How It Works
            </Button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Camera className="h-6 w-6" />
              <span className="text-xl font-bold">PhotoCraft</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 PhotoCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
