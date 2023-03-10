
import { IUser } from "../../../interfaces/user";
import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IController, HttpRequest, HttpResponse } from "../../protocols";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest('Missing fields!')
      }

      if (!id) {
        return badRequest('Missing user id!')
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
        "title",
        "telNumber",
        "imageUrl",
        "linkedinUrl",
        "instagramUrl",
        "githubUrl",
        "resume",
        "jobs",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed")
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
