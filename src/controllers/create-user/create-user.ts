import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createuserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const user = await this.createuserRepository.createUser(httpRequest.body);
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
