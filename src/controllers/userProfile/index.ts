import { Response, Request } from "express";
import { IUserProfile } from "../../types/profile";
import UserProfile from "../../models/userProfile";

const getUserProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const profiles: IUserProfile[] = await UserProfile.find();

        res.status(200).json(profiles);
    } catch (error) {
        throw error;
    }
};

const retrieveUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
        } = req;
        const profile: IUserProfile | null = await UserProfile.findById({ _id: id });

        res.status(profile ? 200 : 404).json(profile);
    } catch (error) {
        throw error;
    }
};

const addUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const {
            firstName, lastName, title, imageUrl, resume, jobs, ...rest } = body
        const {
            instagramUrl, linkedinUrl, githubUrl, telNumber, email } = rest

        const repeat = await UserProfile.aggregate([
            {
                $match: {
                    $or: [
                        { instagramUrl },
                        { linkedinUrl },
                        { githubUrl },
                        { telNumber },
                        { email },
                    ]
                }
            }
        ])

        if (repeat.length > 0) {

            const repeatedFields = repeat.map((user) => {
                const repeated = [];
                for (const key in user) {
                    if (user[key] === rest[key]) {
                        repeated.push(key)
                    }
                }
                return repeated
            }).reduce((prev, current) => {
                return [...prev, ...current]
            }, [])

            const unrepeatedFields = [...new Set(repeatedFields)]

            res.status(409).json({ message: `Erro, dados duplicados: ${unrepeatedFields} ` })
        } else {
            const profile: IUserProfile = new UserProfile(body);

            const newProfile: IUserProfile = await profile.save();

            res.status(201).json(newProfile);
        }


    } catch (error) {
        throw error;
    }
};

const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const updateProfile: IUserProfile | null = await UserProfile.findByIdAndUpdate(
            { _id: id },
            body
        );

        res.status(updateProfile ? 200 : 404).json(updateProfile);
    } catch (error) {
        throw error;
    }
};

const deleteUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProfile: IUserProfile | null = await UserProfile.findByIdAndRemove(
            req.params.id
        );
        res.status(204).json(deletedProfile);
    } catch (error) {
        throw error;
    }
};
export { getUserProfiles, retrieveUserProfile, addUserProfile, updateUserProfile, deleteUserProfile };