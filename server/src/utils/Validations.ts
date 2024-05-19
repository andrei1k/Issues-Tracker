export function isEmailValid(email: string): boolean {
    if (!email) {
        return false;
    }
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isNameValid(name: string): boolean {
    if (!name) {
        return false;
    }
    return /^[а-яА-Яa-zA-Z-]+$/.test(name);
}

export function isPasswordStrong(password: string): boolean {
    if (!password) {
        return false;
    }
    return /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(password);
}

export function isTitleValid(title: string): boolean {        
    if ((!title || title.length < 1 || title.length > 60)) {
        return false;
    }
    
    return !/[@!?#$%^&*()]/.test(title);
}

export function isIdValid(id: string) {
    if (!id) {
        return false;
    }
    return Number.isInteger(parseInt(id, 10))
}