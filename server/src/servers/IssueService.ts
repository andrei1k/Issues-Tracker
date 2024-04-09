import { Issue } from '../models/Issue';

export interface IssueServiceModel {
    title: string
    description: string
    priority: number
    statusId: number
    projectId: number
    assignedTo?: number
}

class IssueService {

    async createIssue(issueData: Partial<IssueServiceModel>) {  
        try {
            const addedIssue = await Issue.query().insert(issueData);
            return addedIssue;
        } catch(err) {
            throw new Error('Could not create issues');
        }
    }

    async removeIssue(issueId: number) {
        try {
            const deletedIssue = await Issue.query().deleteById(issueId);
            return deletedIssue;
        } catch(err) {
            throw new Error('Could not delete issues');
        }
    }

    async editIssue(issueId: number, newIssueData: Partial<IssueServiceModel>) {
        try {
            const updatedIssue = await Issue.query().patchAndFetchById(issueId, newIssueData);
            return updatedIssue;
        } catch(err) {
            throw new Error('Could not create issues');
        }
    }

    async getAllIssuesForProject(projId: number) {
        try {
            const issues = await Issue.query()
                                .where('projectId', projId)
                                .withGraphFetched('assignedUser')
                                .withGraphFetched('status');
          
            const issuesMapped = issues.map(issue => {
                return {
                    title: issue.title,
                    description: issue.description,
                    priority: issue.priority,
                    status: issue.status?.name,
                    assignedTo: issue.assignedUser 
                    ? `${issue.assignedUser?.firstName} ${issue.assignedUser?.lastName}` 
                    : null
                }
            });
            return issuesMapped;
        } catch(err) {
            throw new Error('Could not fetch issues'); 
        }
    }

    // async getAllIssues() {
    //     try {
    //         let issues = await Issue.query().withGraphFetched(['status', 'assignedUser'])
    //         console.log(issues);
    //         const issueServiceModels = issues.map(issue => {
    //             return {
    //                 title: issue.title,
    //                 description: issue.description,
    //                 priority: issue.priority,
    //                 statusId: issue.status?.name,
    //                 assignedTo: issue.assignedUser?.firstName + ' ' + issue.assignedUser?.lastName,
    //             }
    //         });
    //         return issueServiceModels;
    //     } catch(err) {
    //         throw new Error('Could not fetch issues'); 
    //     }
    // }
}

export default new IssueService();