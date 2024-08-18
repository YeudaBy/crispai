import {RecipePreview} from "@/src/model/Recipe";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import {RecipeCard} from "@/src/components/recipe";
import {useSession} from "next-auth/react";


export const getServerSideProps = (async (context) => {
    const id = context.params?.id as string | undefined;
    if (!id) {
        return {notFound: true}
    }
    const recipe = await recipeRepository.getRecipe(Number(id));
    if (!recipe) {
        return {notFound: true}
    }
    return {props: {recipe}}
}) satisfies GetServerSideProps<{ recipe: RecipePreview }>

export default function Page({recipe}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const session = useSession()

    console.log(recipe)

    const isOwner = session.data?.user?.id === recipe.user.id

    return (
        <main>
            <RecipeCard recipe={recipe}/>
            {isOwner && <a href={`/recipe/${recipe.id}/edit`}>Edit</a>}
        </main>
    )
}
