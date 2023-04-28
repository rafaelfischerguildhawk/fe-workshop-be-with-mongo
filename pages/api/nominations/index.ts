import type { NextApiRequest, NextApiResponse } from "next";
import {
  NominationsRepositoryInMemory,
  NominationsRepositoryMongo,
} from "../../../src/server/repositories";
import { Utils } from "../../../src/server/utils";
import { nominationsController } from "../../../src/server/controllers";
import { mongoInit } from "../../../src/server/config/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, body, query } = req;
  const { nominatorId, nomineeId, value, description } = body;

  try {
    mongoInit();

    if (method === "GET") {
      const response = await nominationsController.list();
      return res.status(200).json({ data: response });
    }

    if (method === "POST") {
      const response = await nominationsController.create(
        nominatorId,
        nomineeId,
        value,
        description
      );

      return res.status(200).json({ data: response });
    }

    return res.status(405).json({ message: "Method not supported" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}

// export const nominationsRepository = new NominationsRepositoryInMemory();
export const nominationsRepository = new NominationsRepositoryMongo();
export const utils = new Utils();
