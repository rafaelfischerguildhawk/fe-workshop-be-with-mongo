import { nominationsRepository, utils } from "../../../pages/api/nominations";
import { IValue } from "../entities";

export const nominationsController = {
  create: async (
    nominatorId: string,
    nomineeId: string,
    value: IValue,
    description: string
  ) => {
    // validate the payload
    const validatedNomination = utils.validateCreateNominationPayload(
      nominatorId,
      nomineeId,
      value,
      description
    );

    await nominationsRepository.create(validatedNomination);
  },
  getById: async (id: string) => {
    const nomination = await nominationsRepository.findById(id);

    if (!nomination) throw new Error("Not Found");

    return nomination;
  },
  list: async () => {
    return await nominationsRepository.list();
  },
};
