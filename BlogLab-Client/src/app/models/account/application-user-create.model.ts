export class ApplicationUserCreate {
    constructor(
        public userName: string,
        public password: string, 
        public email: string, 
        public fullName?: string
    ) {}
}