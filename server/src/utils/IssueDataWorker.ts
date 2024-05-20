import { isNameValid } from "./Validations";
import { UserService } from "../services/UserService"; 
import { User } from "../models/User";

const userService = new UserService();

export function nameToId(assignedTo: string) { 
    
    const firstName = assignedTo.split(' ')[0]; 
    const lastName = assignedTo.split(' ')[1]; 
    if (!isNameValid(firstName) || !isNameValid(lastName)) {
        throw Error('Invalid name!');
    }

    return userService.getUserIdByNames(firstName, lastName);
}

export function priorityToNumber(priority: string) {
    switch (priority) {
        case 'Low':
            return 0;
        case 'Medium':
            return 1;
        case 'High':
            return 2;
        default:
            return 3; // bug in database
    }
}

export function numberPriorityToString(priority: number) {
    switch (priority) {
        case 0:
            return 'Low';
        case 1:
            return 'Medium';
        case 2:
            return 'High';
        default:
            return 'Bug';
    }
}

// export function 