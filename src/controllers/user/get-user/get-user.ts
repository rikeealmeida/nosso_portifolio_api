import { IUser } from "../../../interfaces/user";
import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IController, HttpResponse, HttpRequest } from "../../protocols";
import { IGetUserRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return badRequest("Missing user id");
      }
      const user = await this.getUserRepository.getUser(id);
      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
