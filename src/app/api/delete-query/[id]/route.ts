import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();

  // Await the params promise
  const { id } = await context.params;

  // Get session from the request
  const session = await getServerSession({ req, ...authOptions });
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await Question.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}
