'use client';

import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/message.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-16">
        {/* Left Text Section */}
        <section className="text-center md:text-left max-w-md space-y-4">
          <h1 className="text-6xl  font-bold">
            Dive into{' '}
            <span className="text-sky-400 font-extrabold">Anonymous</span> Feedback
          </h1>
          <p className="text-gray-300 text-lg">
            Share your thoughts freely and securely. No names. No pressure. Just truth.
          </p>
        </section>

        {/* Carousel Section */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-gray-800 border-none">
                  <CardHeader>
                    <CardTitle className="text-white">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start gap-4">
                    <Mail className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-white">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{message.received}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <footer className="text-center py-4 text-sm text-gray-400 border-t border-gray-800">
        © 2025 Quip. All rights reserved.
      </footer>
    </div>
  );
}
