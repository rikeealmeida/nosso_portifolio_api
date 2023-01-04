
import { IUser } from "../../../interfaces/user";
import { ok, serverError } from "../../../helpers/helpers";
import { IController, HttpResponse } from "../../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) { }
  async handle(): Promise<HttpResponse<IUser[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();
      return ok<IUser[]>(users)

    } catch (error) {
      return serverError()
    }
  }
}
