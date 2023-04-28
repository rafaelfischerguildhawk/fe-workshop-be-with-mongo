import mongoose from "mongoose";
import { INomination } from "../entities";

export abstract class Repository {
  abstract create(nomination: INomination): Promise<any>;
  abstract list(): Promise<any>;
  abstract findById(id: string): Promise<any>;
}

export class NominationsRepositoryInMemory implements Repository {
  nominations: INomination[] = [];

  public async create(nomination: INomination) {
    this.nominations = [...this.nominations, nomination];
  }

  public async list() {
    return this.nominations;
  }

  public async findById(id: string) {
    return this.nominations.find((nomination) => nomination.id === id);
  }
}

const nominationSchema = new mongoose.Schema({
  nominatorId: String,
  nomineeId: String,
  value: String,
  description: String,
  createdAt: Date,
});
const Nomination = mongoose.model("Nomination", nominationSchema);

export class NominationsRepositoryMongo implements Repository {
  nominations: INomination[] = [];

  public async create(nomination: INomination) {
    await Nomination.create(nomination);
  }

  public async list() {
    return this.nominations;
  }

  public async findById(id: string) {
    return this.nominations.find((nomination) => nomination.id === id);
  }
}
