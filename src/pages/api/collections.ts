import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const collections = await prisma.collection.findMany();
    return res.json(collections);
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ error: e.message });
  }
}
