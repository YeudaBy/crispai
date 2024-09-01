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

    const {title, description, id, images} = JSON.parse(req.body);

    console.log(req.method)

    switch (req.method) {
        case "PUT":
            const newId = await recipeRepository.createRecipe(title, description, userId, images[0]);
            res.status(200).json({message: "Recipe created", id: newId});
            break;
        case "POST":
            if (!id) {
                res.status(400).json({error: "No recipe id provided"});
                return;
            }
            if (!!title) await recipeRepository.updateTitle(id, title);
            if (!!description) await recipeRepository.updateDescription(id, description);
            if (!!images.length) {
                for (const image of images) {
                    await recipeRepository.updateImage(id, image);
                }
            }
            res.status(200).json({message: "Recipe updated"});
            break
        case "DELETE":
            if (!id) {
                res.status(400).json({error: "No recipe id provided"});
                return;
            }
            recipeRepository.deleteRecipe(id);
            res.status(200).json({message: "Recipe deleted"});
            break
        case "GET":
            if (!id) {
                res.status(400).json({error: "No recipe id provided"});
                return;
            }
            const recipe = await recipeRepository.getRecipe(id);
            res.status(200).json(recipe);
            break;
        default:
            res.status(405).json({error: "Method not allowed"});
            break;
    }

}
