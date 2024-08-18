import {recipeRepository} from "@/src/repositories/recipeRepository";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {RecipePreview} from "@/src/model/Recipe";
import {userRepository} from "@/src/repositories/userRepository";
import {User} from "@/src/model/User";
import {RecipeCard} from "@/src/components/recipe";
import {auth} from "@/pages/api/auth/[...nextauth]";

export const getServerSideProps = (async (context) => {
    const session = await auth(context.req, context.res);
    const myId = Number(session?.user.id);

    if (Number.isNaN(myId)) {
        return {notFound: true}
    }

    const recipes = await recipeRepository.getRecipesByUser(myId);
    const user = await userRepository.getUser(myId);

    if (!user) {
        return {notFound: true}
    }

    return {props: {recipes, user}}
}) satisfies GetServerSideProps<{
    recipes: RecipePreview[],
    user: User
}>


export default function Page({recipes, user}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main>
            <h1>{user.name}</h1>
            <p>{user.email}</p>

            <div>
                <h2>Recipes</h2>
                <ul>
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id}/>
                    ))}
                </ul>
            </div>
        </main>
    )
}
