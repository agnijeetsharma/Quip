
'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const questionSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters'),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function AddQuestionForm({ onQuestionAdded }: { onQuestionAdded: () => void }) {
  const { toast } = useToast();
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (data: QuestionFormData) => {
    try {
      await axios.post('/api/questions/', data);
      toast({ title: 'Question added!' });
      onQuestionAdded();
      form.reset();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add question.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-start">
      <Input {...form.register('question')} placeholder="Enter your question..." className="flex-grow" />
      <Button type="submit">Add</Button>
    </form>
  );
}
