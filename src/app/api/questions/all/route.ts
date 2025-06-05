import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/options'; // Adjust path if needed



export async function GET() {
  await dbConnect();

//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response(
//       JSON.stringify({ message: 'Unauthorized' }),
//       { status: 401, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const userId = session.user._id;

  const questions = await Question.find();

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
