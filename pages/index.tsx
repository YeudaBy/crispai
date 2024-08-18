import {RecipePreview} from "@/src/model/Recipe";
import React from "react";
import {RecipeCardLarge} from "@/src/components/recipe";
import {useRouter} from "next/router";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import Image from "next/image";
import {Tag} from "@/src/model/Tag";
import Link from "next/link";


export default function Home(props: {
    byLikes: RecipePreview[],
    tags: Tag[]
}) {
    const [query, setQuery] = React.useState<string>('')
    const router = useRouter()
    console.log(props)
    return (
        <>
            <Image src={"/crispai.svg"} width={200} height={200} alt={"Crispai Logo"} className={"mx-auto"}/>

            <form className="flex m-2 justify-center gap-2" onSubmit={e => {
                e.preventDefault()
                if (query !== '') {
                    router.push(`/search/${query}`)
                }
            }}>
                <input type="text" placeholder={'Search'} value={query} onChange={(e) => setQuery(e.target.value)}
                       className={"rounded-full bg-neutral-200 border-2 w-full text-sm p-2"}/>

                <button type="submit" className={"bg-neutral-200 border-2 text-white rounded-full p-2"}>
                    <Image src={"/pan-icon.svg"} width={30} height={30} alt={"Search Icon"}/>
                </button>
            </form>

            <div className={"flex gap-2 flex-wrap p-2"}>
                {props.tags?.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.id}`} className={"w-fit"}>
                        <div
                            className={"flex gap-1 justify-center items-center bg-neutral-300 rounded-full w-fit px-2"}>
                            <Image src={tag.image
                                ? tag.image
                                : "/default-tag.svg"} width={32} height={32} alt={tag.name}/>
                            {tag.name}
                        </div>
                    </Link>)
                )}
            </div>

            <div className={"flex flex-wrap p-2 gap-4 justify-center"}>
                {props.byLikes?.map((recipe) => (
                    <RecipeCardLarge recipe={recipe} key={recipe.id}/>
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const byLikes = await recipeRepository.getRecipesByLikes()
    const tags = await recipeRepository.getTags()

    return {
        props: {
            byLikes, tags
        }
    }
}
