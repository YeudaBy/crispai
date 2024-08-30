import {recipeRepository} from "@/src/repositories/recipeRepository";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {RecipePreview} from "@/src/model/Recipe";
import {Author} from "@/src/model/Author";
import {RecipeCardLarge} from "@/src/components/recipe";
import {authorRepository} from "@/src/repositories/authorRepository";

export const getServerSideProps = (async (context) => {
    const id = context.params?.id as string | undefined;
    if (!id) {
        return {notFound: true}
    }
    const recipes = await recipeRepository.getRecipesByUser(Number(id));
    const author = await authorRepository.getAuthor(Number(id));
    if (!author) {
        return {notFound: true}
    }
    return {props: {recipes, author}}
}) satisfies GetServerSideProps<{
    author: Author,
    recipes: RecipePreview[]
}>

export default function Page({recipes, author}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main>
            <h1>{author.account.name}</h1>

            <div>
                <h2>Recipes</h2>
                <ul>
                    {recipes.map((recipe) => (
                        <RecipeCardLarge recipe={recipe} key={recipe.id}/>
                    ))}
                </ul>
            </div>
        </main>
    )
}
