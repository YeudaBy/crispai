import {recipeRepository} from "@/src/repositories/recipeRepository";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {RecipePreview} from "@/src/model/Recipe";
import {RecipeCardLarge} from "@/src/components/recipe";

export const getServerSideProps = (async (context) => {
    const query = context.params?.query as string | undefined;
    if (!query) {
        return {notFound: true}
    }
    const recipes = await recipeRepository.getRecipesBySearch(query)
    return {props: {recipes}}
}) satisfies GetServerSideProps<{ recipes: RecipePreview[] }>

export default function Page({recipes}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main>
            <h1>Search results</h1>
            <div>
                {recipes.map((recipe) => (
                    <RecipeCardLarge recipe={recipe} key={recipe.id}/>
                ))}
            </div>
        </main>
    )
}
