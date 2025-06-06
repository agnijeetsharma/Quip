'use client';

import axios from 'axios';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { DeleteIcon,Delete } from "lucide-react";

interface Question {
  _id: string;
  question: string;
}

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: string) => void;
}

export default function QuestionList({ questions, onDelete }: QuestionListProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/delete-query/${id}`);
      onDelete(id); // update state in parent
      toast({ title: 'Deleted' });
    } catch (error) {
      console.error('Delete error:', error);
      toast({ title: 'Error', description: 'Could not delete', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-3">
      {questions.length === 0 ? (
        <p className="text-sm text-gray-500">No questions added yet.</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="flex justify-between items-center border p-2 rounded-md">
            <p className="text-sm text-gray-800">{q.question}</p>
            <Button  variant="destructive" onClick={() => handleDelete(q._id)}>
             <Delete className='w-5 h-5'/>
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
