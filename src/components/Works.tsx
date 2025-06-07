"use client";

import {
  CheckCircle,
  MessageCircleQuestion,
  Trash2,
  Settings,
  ThumbsUp,
  Mail,
  UserCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* <Navbar /> */}

      <main className="flex-grow px-6 py-12 max-w-6xl mx-auto space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            How Does <span className="text-sky-400">Quip</span> Work?
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore how Quip makes anonymous messaging thoughtful, engaging, and
            safe.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            Getting Started in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Create an Account",
                desc: "Sign in quickly and set up your anonymous profile.",
                icon: <UserCircle size={32} className="text-sky-400" />,
              },
              {
                title: "2. Share Your Link",
                desc: "Get your unique message link to share with friends and followers.",
                icon: <Mail size={32} className="text-sky-400" />,
              },
              {
                title: "3. Receive & Answer Messages",
                desc: "View anonymous messages and respond whenever you like.",
                icon: (
                  <MessageCircleQuestion size={32} className="text-sky-400" />
                ),
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
              >
                <div className="mb-3">{step.icon}</div>
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            Key Features You’ll Love
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart AI Suggestions",
                desc: "Get unique, AI-generated questions to send or answer anonymously.",
                icon: <CheckCircle size={28} className="text-green-400" />,
              },
              {
                title: "Answer Anonymously",
                desc: "Respond to questions while staying completely anonymous.",
                icon: (
                  <MessageCircleQuestion size={28} className="text-blue-400" />
                ),
              },
              {
                title: "Delete Questions & Messages",
                desc: "Don’t like a question or message? Easily remove it anytime.",
                icon: <Trash2 size={28} className="text-red-500" />,
              },
              {
                title: "Sidebar Feedback Panel",
                desc: "Leave feedback or thoughts directly from the sidebar.",
                icon: <ThumbsUp size={28} className="text-yellow-400" />,
              },
              {
                title: "User Dashboard",
                desc: "Manage your profile, view messages, post new questions, and more.",
                icon: <Settings size={28} className="text-violet-400" />,
              },
              {
                title: "Full Privacy & Control",
                desc: "Everything stays private unless you choose to share it.",
                icon: <Lock size={28} className="text-pink-400" />,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-800 p-5 rounded-xl flex items-start gap-4 border border-gray-700"
              >
                <div className="pt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-10 space-y-4">
          <h3 className="text-2xl font-semibold">Ready to Try It Out?</h3>
          <p className="text-gray-400">
            Create your profile and start receiving messages today.
          </p>
          <Link href="/sign-in">
            <Button className="bg-white text-black hover:bg-yellow-500 transition px-6 py-3">
              Get Started
            </Button>
          </Link>
        </section>
      </main>

      <footer className="text-center py-4 text-sm text-gray-400 border-t border-gray-800">
        © 2025 Quip. All rights reserved.
      </footer>
    </div>
  );
}
