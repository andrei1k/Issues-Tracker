import { Request, Response } from 'express';
import issueService, { IssueServiceModel }  from '../services/IssueService';

class IssueController {

    async createIssue(req: Request, res: Response) {
        try {
            const issueData: IssueServiceModel = req.body as IssueServiceModel;
            issueData.projectId = parseInt(req.params.projectId);
            
            const errors = IssueController.validateIssueData(issueData);

            
            if (Object.keys(errors).length > 0) {
                return res.status(400).json({'errors': errors});
            }

            console.log(issueData);
            const newIssue = await issueService.createIssue(issueData);
            res.status(201).json(newIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error. Failed to create issue' });
        }
    }

    async removeIssue(req: Request, res: Response) {
        try {
            const issueId = parseInt(req.params.issueId);
            const deletedIssue = await issueService.removeIssue(issueId);
            res.status(200).json(deletedIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error. Failed to remove issue' });
        }
    }

    async editIssue(req: Request, res: Response) {
        try {
            const issueId = parseInt(req.params.issueId);
            const newIssueData: IssueServiceModel = req.body as IssueServiceModel;
            
            const existingIssue = await issueService.getIssueById(issueId);
            if (!existingIssue) {
                return res.status(404).json({error: 'Issue not found'});
            }

            const issueToValidate = {
                ...existingIssue,
                ...newIssueData
            } as IssueServiceModel;

            const errors = IssueController.validateIssueData(issueToValidate);

            if (Object.keys(errors).length > 0) {
                return res.status(400).json({'errors': errors});
            }

            const editIssue = await issueService.editIssue(issueId, newIssueData);
            res.status(200).json(editIssue);
        } catch(err) {
            res.status(500).json({error: 'Server error. Failed to edit issue' + err });
        }
    }

    async getAllIssuesForProject(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const issues = await issueService.getAllIssuesForProject(projectId);
            res.status(200).json(issues);
        } catch(err) {
            res.status(500).json({error: 'Server error. Cannot get all issues for project' });
        }
    }

    async getIssueById(req: Request, res: Response) {
        try {
            const issueId = parseInt(req.params.issueId);

            const issue = await issueService.getIssueById(issueId);
            res.status(200).json(issue);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }

    async getAllIssues(req: Request, res: Response) {
        try {
            const issues = await issueService.getAllIssues();
            res.status(200).json(issues);
        } catch(err) {
            res.status(500).json({error: 'Server error' });
        }
    }

    private static validateIssueData(issueData: IssueServiceModel) {

        const errors: {[key: string]: string} = {};

        if (!issueData.title || !issueData.description || !issueData.priority) {
            errors["required"] = 'Required fields are missing';
        }
        
        if (issueData.title.length > 255 || issueData.title.length < 3) {
            errors["title"] = 'Invalid title length';
            
        }

        if (issueData.description.length > 1000 || issueData.description.length < 10) {
            errors["description"] = 'Invalid description length';
        }

        return errors;
    }
}

export default new IssueController(); 