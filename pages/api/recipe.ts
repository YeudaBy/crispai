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

    console.log(session.user);

    if (req.method === "POST") {
        const {title, description, image, id} = JSON.parse(req.body);
        if (!id) {
            res.status(400).json({error: "No recipe id provided"});
            return;
        }
        if (!!title) await recipeRepository.updateTitle(id, title);
        if (!!description) await recipeRepository.updateDescription(id, description);
        if (!!image) await recipeRepository.updateImage(id, image);
        res.status(200).json({message: "Recipe updated"});
    } else {
        const {title, description, image} = req.body || req.query;
        const newId = await recipeRepository.createRecipe(title, description, userId, image);
        res.redirect(303, `/recipe/${newId}`);
    }

}
