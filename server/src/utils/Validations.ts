export function isEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isNameValid(name: string): boolean {
    return /^[а-яА-Яa-zA-Z-]+$/.test(name);
}

export function isPasswordStrong(password: string): boolean {
    return /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(password);
}

export function isTitleValid(title: string): boolean {        
    const forbiddenCharsRegex = /[@!?#$%^&*()]/;
    if ((title.length < 1 || title.length > 60) || forbiddenCharsRegex.test(title)) {
        return false;
    }
    
    return true;
}