export class ApplicationUser {
    constructor(
        public userName: string,
        public applicationUserId: number, 
        public email: string, 
        public token: string,
        public fullName?: string
    ) {}
}