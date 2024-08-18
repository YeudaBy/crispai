import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {recipeRepository} from "@/src/repositories/recipeRepository";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const {title, description} = req.body;
        const userId = session.user.id;
        const newId = await recipeRepository.createRecipe(title, description, userId);
        res.redirect(`/recipe/${newId}`);
    } else {
        res.status(403).json({
            error: "You must be signed in to create a recipe.",
        })
    }
}
