import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { name, email } = req.query;
    
        let users;
    
        if (name || email) {
          users = await prisma.users.findMany({
            where: {
              name: name ? { contains: name as string } : undefined,
              email: email ? { contains: email as string } : undefined,
            },
          });
        } else {
          users = await prisma.users.findMany();
        }
    
        res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } else if (req.method === 'PUT') {
    const { id, name, email, password } = req.body;
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json(updatedUser);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.users.delete({ where: { id } });
    res.status(204).end(); // No content
  } else {
    res.status(405).end(); // Method not allowed
  }
}
