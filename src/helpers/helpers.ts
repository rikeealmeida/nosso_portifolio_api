/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, HttpStatusCode } from "../controllers/protocols"

export const ok = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.OK, body
})

export const created = <T>(body: any): HttpResponse<T> => ({ statusCode: HttpStatusCode.CREATED, body })

export const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message,
    }
}
export const notFound = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.NOT_FOUND_ERROR,
        body: message,
    }
}
export const serverError = (): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: 'Something went wrong',
    }
}

export const unauthorizedError = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.UNAUTHORIZED_ERROR,
        body: message
    }
}