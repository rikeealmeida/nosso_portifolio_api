import validator from "validator";
import { IUser } from "../../../interfaces/user";
import { badRequest, created, serverError } from "../../../helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { MongoClient } from "../../../database/mongo";
import bcrypt from 'bcrypt'

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
        "password"
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

      const {
        firstName,
        lastName,
        password,
        imageUrl,
        jobs,
        resume, telNumber, title,
        email,
        githubUrl,
        instagramUrl,
        linkedinUrl
      } = httpRequest.body


      const userFIelds = await MongoClient.db.collection('users').findOne<IUser>({
        $or: [
          { email },
          { githubUrl },
          { instagramUrl },
          { linkedinUrl },
        ]
      })

      const registeredFields = []

      for (const key in userFIelds) {
        switch (key) {
          case 'email':
            if (userFIelds[key] === email) {
              registeredFields.push(key)
            }
            break;
          case 'githubUrl':
            if (userFIelds[key] === githubUrl) {
              registeredFields.push(key)
            }
            break;
          case 'linkedinUrl':
            if (userFIelds[key] === linkedinUrl) {
              registeredFields.push(key)
            }
            break;
          case 'instagramUrl':
            if (userFIelds[key] === instagramUrl) {
              registeredFields.push(key)
            }
            break;
        }
      }
      if (registeredFields.length > 0) {
        return badRequest(`Some fields are already registered: ${registeredFields}`)
      }

      const hashPassword = await bcrypt.hash(password, 10)

      const newUser = await this.createuserRepository.createUser(
        {
          firstName,
          lastName,
          password: hashPassword,
          email,
          githubUrl,
          imageUrl,
          instagramUrl,
          jobs,
          linkedinUrl,
          resume,
          telNumber,
          title,
        }
      );

      const { password: _, ...user } = newUser

      return created<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
