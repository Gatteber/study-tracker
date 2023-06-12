declare namespace Express {
    //if user in request body, assert types.
    interface IUserRequest {
        _id: string,
        name: string,
        email: string,
    };

    interface Request extends Express.Request {
        user?: IUserRequest | null
    }
};