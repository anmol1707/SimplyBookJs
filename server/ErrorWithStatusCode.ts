export default class ErrorWithStatusCode extends Error {

    constructor(message: string, code: number) {
        super(message);
        this.message = message;
        this.code = code;
    }

    message: string;
    code: number;
}
