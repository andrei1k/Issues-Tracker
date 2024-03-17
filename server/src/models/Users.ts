import { Model } from "objection";

export class User extends Model {

    static readonly tableName = 'users'

    id!: number
    username!: string
    password!: string
    firstName!: string
    lastName!: string
}