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

   
    </div>
  );
}
