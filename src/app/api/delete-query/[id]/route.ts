import dbConnect from '@/lib/dbConnect';
import { Question } from '@/model/questions';
import { getServerSession } from 'next-auth';
// import { authOptions } from '/auth/[...nextauth]/options';
import { authOptions } from '../../auth/[...nextauth]/options';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Question.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}