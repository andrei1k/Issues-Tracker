import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Project } from "./Project";
import { Issue } from "./Issue";

export class UserProject extends BaseModel {

    static readonly tableName = 'userProjects'

    userId!: number
    projectId!: number

    
}