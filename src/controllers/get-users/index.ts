import { Response, Request } from "express";
import { IUser } from "../../types/user";
import User from "../../models/user";

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const user: IUser | null = await User.findById({
      _id: id,
    });

    res.status(user ? 200 : 404).json(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const addUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const body = req.body;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { firstName, lastName, title, imageUrl, resume, jobs, ...rest } =
//       body;
//     const { instagramUrl, linkedinUrl, githubUrl, telNumber, email } = rest;

//     const repeat = await User.aggregate([
//       {
//         $match: {
//           $or: [
//             { instagramUrl },
//             { linkedinUrl },
//             { githubUrl },
//             { telNumber },
//             { email },
//           ],
//         },
//       },
//     ]);

//     if (repeat.length > 0) {
//       const repeatedFields = repeat
//         .map((user) => {
//           const repeated = [];
//           for (const key in user) {
//             if (user[key] === rest[key]) {
//               repeated.push(key);
//             }
//           }
//           return repeated;
//         })
//         .reduce((prev, current) => {
//           return [...prev, ...current];
//         }, []);

//       const unrepeatedFields = [...new Set(repeatedFields)];

//       res
//         .status(409)
//         .json({ message: `Erro, dados duplicados: ${unrepeatedFields} ` });
//     } else {
//       const user: IUser = new User(body);

//       const newUser: IUser = await user.save();

//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updateProfile: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    );

    res.status(updateProfile ? 200 : 404).json(updateProfile);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProfile: IUser | null = await User.findByIdAndRemove(
      req.params.id
    );
    res.status(204).json(deletedProfile);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {
  getUser,
  retrieveUser,
  // addUser,
  updateUser,
  deleteUser,
};
