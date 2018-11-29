export default class JsonResponse {

    status: boolean;
    message: string;
    data: any;

    constructor(status, message = "", data = null) {

        this.status = status;
        this.message = message;
        this.data = data;

    }

}