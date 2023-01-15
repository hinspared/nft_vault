import { type Decimal } from "@prisma/client/runtime";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const volume = req.body.volume as Decimal;
  try {
    const sale = await prisma.collection.update({
      where: { contractAddress: id },
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
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ error: e.message });
  }
}
