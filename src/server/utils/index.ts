import { INomination, IValue } from "../entities";
import { randomUUID } from "crypto";

export class Utils {
  validateCreateNominationPayload(
    nominatorId: string,
    nomineeId: string,
    value: IValue,
    description: string
  ): INomination {
    if (!description) throw new Error("You need to provide a description");

    return {
      nominatorId: nominatorId,
      description: description,
      nomineeId: nominatorId,
      value: value,
      createdAt: new Date(),
      id: randomUUID(),
    };
  }
}
