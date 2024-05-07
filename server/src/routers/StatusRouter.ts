import { Router } from "express";
import { statusService } from "../services/StatusService";


export const statusRouter = Router();

statusRouter.get('/', async (req, res) => {

    let statuses = await statusService.getStatuses()
    
    res.send(statuses)
});