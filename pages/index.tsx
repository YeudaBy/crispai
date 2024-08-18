import {RecipePreview} from "@/src/model/Recipe";
import React from "react";
import {Icon, RecipeCard} from "@/src/components/recipe";
import {useRouter} from "next/router";
import {recipeRepository} from "@/src/repositories/recipeRepository";


export default function Home(props: { byLikes: RecipePreview[] }) {
    const [query, setQuery] = React.useState<string>('')
    const router = useRouter()
    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-4">Welcome to <span
                className={'text-pastelPurple-700'}>CrispAI</span>
            </h1>
            <p className="text-lg grow text-center">The future of <span className={'text-pastelPurple-700'}>AI</span> is
                here</p>

            <form className="flex m-2 p-2 justify-center" onSubmit={e => {
                e.preventDefault()
                if (query !== '') {
                    router.push(`/search/${query}`)
                }
            }}>
                <input type="text" placeholder={'Search'} value={query} onChange={(e) => setQuery(e.target.value)}
                       className="border-4 border-wood-300 rounded-tl-full rounded-bl-full text-xl w-full text-pastelLavender-700 p-2"/>
                <button
                    className="px-6 py-2 bg-pastelLavender-200 rounded-tr-full rounded-br-full p-2 text-pastelPurple-800 flex flex-row gap-3 items-center justify-center">
                    Search
                    <Icon/>
                </button>
            </form>

            <h2 className="text-2xl font-bold text-center">Most Liked Recipes</h2>
            <div className={"flex flex-wrap gap-4 justify-center"}>
                {props.byLikes?.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe.id}/>
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const byLikes = await recipeRepository.getRecipesByLikes()

    return {
        props: {
            byLikes
        }
    }
}
