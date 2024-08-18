import {recipeRepository} from "@/src/repositories/recipeRepository";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {RecipePreview} from "@/src/model/Recipe";
import {User} from "@/src/model/User";
import {userRepository} from "@/src/repositories/userRepository";
import {RecipeCard} from "@/src/components/recipe";

export const getServerSideProps = (async (context) => {
    const id = context.params?.id as string | undefined;
    if (!id) {
        return {notFound: true}
    }
    const recipes = await recipeRepository.getRecipesByUser(Number(id));
    const user = await userRepository.getUser(Number(id));
    if (!user) {
        return {notFound: true}
    }
    return {props: {recipes, user}}
}) satisfies GetServerSideProps<{
    user: User,
    recipes: RecipePreview[]
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
