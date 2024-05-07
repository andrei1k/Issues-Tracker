import { Status } from "../models/Status";

class StatusService {



    async getStatuses() {
        return Status.query().withGraphFetched('[followingStatuses]')
    }
}

export let statusService = new StatusService()