
import { IUser } from "../../../interfaces/user";
import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IController, HttpRequest, HttpResponse } from "../../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) { }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return badRequest('Missing user id')

      }
      const user = await this.deleteUserRepository.deleteUser(id);
      return ok<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
