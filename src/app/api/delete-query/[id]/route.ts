import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, context: any) {
  const { id } = (context as { params: { id: string } }).params;
  console.log('Delete Request for message ID:', id);
  if (!id) {
    return NextResponse.json({ message: 'Message ID is required' }, { status: 400 });
  }

  await dbConnect();

  const session = await getServerSession({ req, ...authOptions });
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await Question.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}
