export interface UserLoginParams {
    email: string,
    password: string
}


export interface UserLoginRepository {
    userLogin(params: UserLoginParams): Promise<string>;
}
