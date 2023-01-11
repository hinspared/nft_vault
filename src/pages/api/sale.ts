import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const id = req.query.id as string;
    const id = req.body.id as string;
    const volume = req.body.volume as number;
    handleSale(id, res, volume);
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ error: e.message });
  }
}

async function handleSale(id: string, res: NextApiResponse, volume: number) {
  const sale = await prisma.collection.update({
    where: { id: id },
    data: {
      sales: {
        increment: 1,
      },
      volumeTraded: {
        decrement: volume,
      },
    },
  });
  res.json(sale);
}
