import type { NextApiRequest, NextApiResponse } from "next";
import { nominationsController } from "../../../../src/server/controllers";
import { mongoInit } from "../../../../src/server/config/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, body, query } = req;

  try {
    await mongoInit();

    if (method === "GET") {
      const response = await nominationsController.getById(query.id as string);
      return res.status(200).json({ data: response });
    }

    return res.status(405).json({ message: "Method not supported" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
