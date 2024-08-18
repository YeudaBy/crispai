import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {recipeRepository} from "@/src/repositories/recipeRepository";

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
        const {title, description, image} = JSON.parse(req.body);
        const numId = Number(req.body.id);
        if (!!title) await recipeRepository.updateTitle(numId, title);
        if (!!description) await recipeRepository.updateDescription(numId, description);
        if (!!image) await recipeRepository.updateImage(numId, image);
        res.status(200).json({message: "Recipe updated"});
    } else {
        const {title, description} = req.body || req.query;
        const newId = await recipeRepository.createRecipe(title, description, userId);
        res.redirect(303, `/recipe/${newId}`);
    }
}
