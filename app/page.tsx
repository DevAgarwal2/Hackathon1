import React from 'react';
import { Button } from '@/components/ui/button';
import { Card,  CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Sparkles, Zap, Users,  Upload, Eye, Download } from 'lucide-react';
import AuthButton from '@/component/AuthButton';
import Link from 'next/link';

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
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Now Available
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Transform Your Product Images
            <span className="block text-blue-600">Instantly</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload any product photo and watch it become professional-grade imagery. 
            Virtual try-ons, enhanced backgrounds, and stunning visuals in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Eye className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional-grade photo enhancement tools built for modern businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Instant Upload</CardTitle>
                <CardDescription>
                  Simply drag and drop your product images to get started
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Smart Enhancement</CardTitle>
                <CardDescription>
                  Automatically improve lighting, colors, and image quality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Eye className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Virtual Try-On</CardTitle>
                <CardDescription>
                  Let customers visualize products before they buy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Background Magic</CardTitle>
                <CardDescription>
                  Replace or enhance backgrounds with studio-quality results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get professional results in under 10 seconds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Download className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>High Resolution</CardTitle>
                <CardDescription>
                  Download images in any format and resolution you need
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-muted-foreground text-lg">
                Transform ordinary product photos into extraordinary visuals
              </p>
            </div>
            
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Before</h3>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Camera className="h-12 w-12 mx-auto mb-2" />
                      <p>Original Product Photo</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">After</h3>
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-blue-200">
                    <div className="text-center text-blue-700">
                      <Sparkles className="h-12 w-12 mx-auto mb-2" />
                      <p>Enhanced Result</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Try It Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using PhotoCraft to create stunning product visuals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Users className="mr-2 h-4 w-4" />
              Sign Up with Google
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
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
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Support</a>
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