import { Router } from 'express'
import { CreateUserController } from './controllers/user/create-user/create-user';
import { DeleteUserController } from './controllers/user/delete-user/delete-user';
import { GetUserController } from './controllers/user/get-user/get-user';
import { GetUsersController } from './controllers/user/get-users/get-users';
import { UpdateUserController } from './controllers/user/update-user/update-user';
import { MongoCreateUserRepository } from './repositories/user/create-user/mongo-create-user.';
import { MongoDeleteUserRepository } from './repositories/user/delete-user/mongo-delete-user';
import { MongoGetUserRepository } from './repositories/user/get-user/mongo-get-user';
import { MongoGetUsersRepository } from './repositories/user/get-users/mongo-get-users';
import { MongoUpdateUserRepository } from './repositories/user/update-user/mongo-update-user';

export const routes = Router()


routes.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
});

routes.get("/users/:id", async (req, res) => {
    const mongoGetUserRepository = new MongoGetUserRepository()
    const getUserController = new GetUserController(mongoGetUserRepository)
    const { body, statusCode } = await getUserController.handle({
        params: req.params
    })
    res.status(statusCode).send(body)
})

routes.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
        mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });
    res.status(statusCode).send(body);
});

routes.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
        mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
        params: req.params,
    });
    res.status(statusCode).send(body);
});

routes.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
        mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
        params: req.params,
    });
    res.status(statusCode).send(body);
});