"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Question {
  _id: string;
  content: string;
  username: string;
  createdAt: string;
}

export default function AllQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/questions/all/");
        setQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">
        All Public Questions
      </h1>
      <Separator className="mb-4" />
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.length > 0 ? (
            questions.map((q) => (
              <Link key={q._id} href={`/u/${q.username}/${q._id}/`}>
                <Card className="hover:shadow-lg cursor-pointer transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-md text-gray-800">
                      @{q.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{q.question}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(q.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No public questions yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
