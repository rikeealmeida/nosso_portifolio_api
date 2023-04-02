import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IUser } from "../../../interfaces/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import jwt from "jsonwebtoken";
import { MongoClient } from "../../../database/mongo";
import bcrypt from "bcrypt";

export class UserLoginController implements IController {
  async handle(
    httpRequest: HttpRequest<IUser | undefined>
  ): Promise<HttpResponse<string>> {
    try {
      const { email, password } = httpRequest.body!;

      const user = await MongoClient.db.collection("users").findOne({ email });

      if (!user) {
        return badRequest("E-mail ou senha inválidos!");
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return badRequest("E-mail ou senha inválidos!");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_PASS ?? "", {
        expiresIn: "8h",
      });

      const { password: _, jobs: __, ...userLogin } = user;

      return ok({ user: userLogin, token: token });
    } catch (error) {
      return serverError();
    }
  }
}
