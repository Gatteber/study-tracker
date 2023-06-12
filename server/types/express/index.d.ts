declare namespace Express {
    //if user in request body, assert types.
    //TODO: change user -> authUser or something else. more specific datatype.
    interface IUserRequest {
        _id: string,
        name: string,
        email: string,
    };

    interface Request extends Express.Request {
        user?: IUserRequest | null
    }
};