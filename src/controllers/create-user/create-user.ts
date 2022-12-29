import validator from "validator";
import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createuserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser>> {
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
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 500,
          body: "email is not valid",
        };
      }

      const user = await this.createuserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
