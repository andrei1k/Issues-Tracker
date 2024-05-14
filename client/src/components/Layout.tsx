const Layout = (pathname: string) => {

    switch (true) {
        case pathname === '/':
            return 'Home | Issue Tracker';
        case pathname === '/profile':
            return 'Profile | Issue Tracker';
        case pathname.startsWith('/dashboard'):
            console.log(pathname);
            return 'Dashboard | Issue Tracker';
        case pathname === '/login':
            console.log(pathname);
            return 'Login | Issue Tracker';
        case pathname === '/register':
            return 'Register | Issue Tracker';
        default:
            return 'Not Found | Issue Tracker';
    }
}

export default Layout;