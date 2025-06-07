"use client";

import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";
// import { Button } from "@/ui/button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react"; // Make sure you import this
import HowItWorks from "@/components/Works";

export default function Home() {
  const handleGetStarted = () => {
    
    signIn(); 
  };

  return (
    <div className="flex flex-col min-h-screen  bg-gray-900 text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-16">
        
        <section className="text-center md:text-left max-w-md space-y-6">
          <h1 className="text-6xl font-bold leading-tight">
            Dive into{" "}
            <span className="text-sky-400 font-extrabold">Anonymous</span>{" "}
            Feedback
          </h1>
          <p className="text-gray-300 text-lg">
            Share your thoughts freely and securely. No names. No pressure. Just
            truth.
          </p>

         
          <div className="flex justify-center md:justify-start gap-5">
            <Button
              onClick={handleGetStarted}
              className="bg-white hover:bg-yellow-600 text-black px-6 py-3 text-lg rounded-lg transition"
            >
              Get Started
            </Button>
           
          </div>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-gray-800 border-none">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start gap-4">
                    <Mail className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-white">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

    
      <HowItWorks/>
    </div>
  );
}
