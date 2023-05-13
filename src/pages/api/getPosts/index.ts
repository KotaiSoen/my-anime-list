import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!
      }
    });
    try {
      if (req.method === 'POST') {
        const anime: string = req.body.anime;       

        const createAnime = await prisma.anime.create({
          data: {
            name: anime,
            userId: user?.id,

          }
        })

        res.status(200).json(createAnime);
      }
    } catch (error) {
      console.log('this is the error: ', error);
    }

    try {
      if (req.method === 'GET') {
        
        const getAnime = await prisma.anime.findMany({
          where: {
            userId: user?.id
          },
          orderBy: {
            id: 'asc'
          }
        });

        res.status(200).json(getAnime);
      }
    } catch (error) {
      console.log('this is the error: ', error);
    }
  }


}