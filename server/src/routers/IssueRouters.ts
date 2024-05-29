import { Router } from 'express';

import issueController from '../controllers/IssueController';

export const issueProjRouter = Router({ mergeParams: true });

issueProjRouter.get('/all', issueController.getAllIssuesForProject);
issueProjRouter.post('/create', issueController.createIssue);
issueProjRouter.delete('/remove/:issueId', issueController.removeIssue);
issueProjRouter.patch('/edit/:issueId', issueController.editIssue);

export const issueRouter = Router();

issueRouter.get('/all', issueController.getAllIssues);
issueRouter.get('/:issueId', issueController.getIssueById);
