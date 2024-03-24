import { Model } from "objection";

export class BaseModel extends Model {

    id!: number
    updatedAt!: Date
}