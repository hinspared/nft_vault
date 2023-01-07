import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id as string;
    handleSale(id, res);
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ error: e.message });
  }
}

async function handleSale(id: string, res: NextApiResponse) {
  const sale = await prisma.collection.update({
    where: { id: id },
    data: { sales: +1 },
  });
  res.json(sale);
}
