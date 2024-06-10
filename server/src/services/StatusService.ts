import { Status } from "../models/Status";
import { StatusFlow } from "../models/StatusFlow";

class StatusService {

    async getStatuses() {
        return Status.query().withGraphFetched('[followingStatuses]')
    }

    async addStatusFlowConnection(fromStatus: number, toStatus: number) {

        await StatusFlow.query().insert({fromStatus, toStatus})
    }

    async removeStatusFlowConnection(fromStatus: number, toStatus: number) {

        await StatusFlow.query().delete().where('fromStatus', fromStatus).where('toStatus', toStatus)
    }

    async addStatus(status: string) {

        await Status.query().insert({name: status})
    }

    async removeStatus(status: number) {

        await Status.query().deleteById(status)
    }
}

export let statusService = new StatusService()