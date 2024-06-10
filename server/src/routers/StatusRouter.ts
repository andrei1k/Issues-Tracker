import { Router } from "express";
import { statusService } from "../services/StatusService";


export const statusRouter = Router();

statusRouter.get('/', async (req, res) => {

    let statuses = await statusService.getStatuses()
    
    res.send(statuses)
});

statusRouter.post('/flow', async (req, res) => {

    const {from, to} = req.body

    const fromStatus = Number.parseInt(from)
    const toStatus = Number.parseInt(to)

    // console.log('fromStatus:', fromStatus);
    // console.log('toStatus:', toStatus);

    await statusService.addStatusFlowConnection(fromStatus, toStatus)

    res.send()
})

statusRouter.delete('/flow', async (req, res) => {

    const {from, to} = req.body

    const fromStatus = Number.parseInt(from)
    const toStatus = Number.parseInt(to)

    await statusService.removeStatusFlowConnection(fromStatus, toStatus)

    res.send()
})

statusRouter.post('/', async (req, res) => {

    const {status}: {status: string} = req.body

    await statusService.addStatus(status)

    res.send()
})

statusRouter.delete('/', async (req, res) => {

    const {status} = req.body

    const statusNumber = Number.parseInt(status)

    try {

        await statusService.removeStatus(statusNumber)
        res.send()

    } catch {

        res.status(400).send()
    }
})