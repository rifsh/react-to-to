interface UserRegistration {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    image: string;
    tasks: [string];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    comparePassword(candidatePwsrd: string, dbPswrd: string): Promise<boolean>;
}

interface UserLoginCredentilas {
    userNameOrEmail: string,
    password: string
}

export {
    UserRegistration,
    UserLoginCredentilas
}