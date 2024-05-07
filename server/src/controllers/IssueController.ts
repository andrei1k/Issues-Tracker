import { Request, Response } from 'express';

import { IssueServiceModel } from '../services/IssueService';
import issueService from '../services/IssueService';

class IssueController {

    async createIssue(req: Request, res: Response) {
        try {

            if (req.session.userId === undefined) {
                res.status(401).json({error: 'Unauthorized'});
                return;
            }

            const issueData: IssueServiceModel = req.body as IssueServiceModel;
            issueData.projectId = parseInt(req.params.projectId);

            console.log(issueData);
            const newIssue = await issueService.createIssue(issueData);
            res.status(201).json(newIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }

    async removeIssue(req: Request, res: Response) {
        try {
            if (req.session.userId === undefined) {
                res.status(401).json({error: 'Unauthorized'});
                return;
            }

            const issueId = parseInt(req.params.issueId);
            const deletedIssue = await issueService.removeIssue(issueId);
            res.status(200).json(deletedIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }

    async editIssue(req: Request, res: Response) {
        try {
            if (req.session.userId === undefined) {
                res.status(401).json({error: 'Unauthorized'});
                return;
            }

            const issueId = parseInt(req.params.issueId);
            const newIssueData: IssueServiceModel = req.body as IssueServiceModel;
            const editIssue = await issueService.editIssue(issueId, newIssueData);
            res.status(200).json(editIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }

    async getAllIssuesForProject(req: Request, res: Response) {
        try {
            if (req.session.userId === undefined) {
                res.status(401).json({error: 'Unauthorized'});
                return;
            }

            const projectId = parseInt(req.params.projectId);
            const issues = await issueService.getAllIssuesForProject(projectId);
            res.status(200).json(issues);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }
}

export default new IssueController(); 