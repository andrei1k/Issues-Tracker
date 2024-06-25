import { Issue } from '../models/Issue';
import { Status } from '../models/Status';

export interface IssueServiceModel {
    title: string
    description: string
    priority: number
    status?: Status
    projectId: number
    assignedTo?: number
}

const mapIssues = (issues: Issue[]) => {
    return issues.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        status: issue.status,
        assignedTo: issue.assignedUser
            ? `${issue.assignedUser?.firstName} ${issue.assignedUser?.lastName}`
            : null
    }));
};

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
          
            const issuesMapped = issues.map(issue => ({
                id: issue.id,
                title: issue.title,
                description: issue.description,
                priority: issue.priority,
                status: issue.status,
                assignedTo: issue.assignedTo
            }));

            return issuesMapped;
        } catch(err) {
            throw new Error('Could not fetch issues'); 
        }
    }

    async getAllIssuesForProjectByAssignee(projId: number, userId: number) {
        try {
            const issues = await Issue.query()
                                .where('projectId', projId)
                                .where('assignedTo', userId)
                                .withGraphFetched('assignedUser')
                                .withGraphFetched('status');
                
            const issuesMapped = mapIssues(issues);

            return issuesMapped;
        } catch (err) {
            throw new Error('Could not fetch issues by assignee');
        }
    }

    async getAllIssuesForProjectByPriority(projId: number, priority: number) {
        try {
            const issues = await Issue.query()
                                .where('projectId', projId)
                                .where('priority', priority)
                                .withGraphFetched('assignedUser')
                                .withGraphFetched('status');

            const issuesMapped = mapIssues(issues);

            return issuesMapped;
        } catch(err) {
            throw new Error('Could not fetch issues by priority'); 
        }
    }

    async getIssueById(issueId: number) {
        try {
            const issue = await Issue.query()
                                .findById(issueId)
                                .withGraphFetched('assignedUser')
                                .withGraphFetched('status')
                                .withGraphFetched("status.followingStatuses")
                                .first() as Issue;

            return {
                title: issue.title,
                description: issue.description,
                priority: issue.priority,
                status: issue.status,
                assignedTo: issue.assignedTo,
                projectId: issue.projectId
            }
        } catch(err) {
            throw new Error('Could not fetch issues'); 
        }
    }


    async getAllIssues() {
        try {
            const issues = await Issue.query().withGraphFetched('status').withGraphFetched('assignedUser');
            const allIssuesForUser = mapIssues(issues);
            return allIssuesForUser;
        } catch(err) {
            throw new Error('Could not fetch issues'); 
        }
    }
}

export default new IssueService();