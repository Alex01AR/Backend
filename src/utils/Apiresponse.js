class Apiresponse {

    constructor(statusCode,data,message = "Succes"){
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}