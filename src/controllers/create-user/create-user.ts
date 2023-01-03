import validator from "validator";
import { IUser } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createuserRepository: ICreateUserRepository) { }
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "title",
        "imageUrl",
      ];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length)
          return badRequest(`Field ${field} is required`)
      }
      if (!httpRequest.body) {
        return badRequest("Missing fields!")
      }

      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        return badRequest('E-mail is invalid!')
      }

      const user = await this.createuserRepository.createUser(
        httpRequest.body
      );

      return created<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
