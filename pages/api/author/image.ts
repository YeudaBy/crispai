import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {userRepository} from "@/src/repositories/userRepository";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(403).json({
            error: "You must be signed in to create a recipe.",
        })
        return
    }

    const userId = session.user.id;

    if (req.method === "POST") {
        const {url} = JSON.parse(req.body);
        if (!url) {
            res.status(400).json({
                error: "You must provide a url",
            })
            return;
        }
        console.log(`Changing image for user ${userId} to ${url}`)
        await userRepository.changeImage(userId, url);
        res.status(200).json({success: true});
    } else if (req.method === "DELETE") {
        console.log(`Deleting image for user ${userId}`)
        await userRepository.changeImage(userId, undefined);
        res.status(200).json({success: true});
    } else {
        res.status(405).json({
            error: "Method not allowed",
        })
    }
}
