import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'DELETE') {
            const { id } = req.query
            const delAnime = await prisma.anime.delete({
                where: {
                    id: id![0]
                }
            })
            res.status(200).json(delAnime);
        }
    } catch (error) {
        console.log('this is the error: ', error)
    }
}