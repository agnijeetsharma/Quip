import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';



export async function GET() {
  await dbConnect();
  const questions = await Question.find();

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
