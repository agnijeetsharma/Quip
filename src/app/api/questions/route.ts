import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'; // Adjust path if needed

export async function POST(request: Request) {
  await dbConnect();

  // Parse JSON body
  const body = await request.json();
  const { question } = body;

  // Get session - note: `getServerSession` needs `headers` and `cookies` in app router
  const session = await getServerSession(authOptions)
    

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const userId = session.user._id;
  const username = session.user.username || 'Anonymous';

  if (!question || typeof question !== 'string') {
    return new Response(
      JSON.stringify({ message: 'Question is required and must be a string' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const newQuestion = await Question.create({
    userId,
    username,
    question,
  });

  return new Response(JSON.stringify(newQuestion), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const userId = session.user._id;

  const questions = await Question.find({ userId });

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
