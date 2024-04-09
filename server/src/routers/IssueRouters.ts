import { Router } from 'express';

import issueController from '../controllers/IssueController';

export const issueRouter = Router({ mergeParams: true });

issueRouter.get('/all', issueController.getAllIssuesForProject);
issueRouter.post('/create', issueController.createIssue);
issueRouter.delete('/remove/:issueId', issueController.removeIssue);
issueRouter.patch('/edit/:issueId', issueController.editIssue);



