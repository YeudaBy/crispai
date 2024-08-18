import {RecipePreview} from "@/src/model/Recipe";
import Link from "next/link";
import React from "react";

export function RecipeCardLarge({recipe}: { recipe: RecipePreview }) {
    return (
        <div
            className="shadow-lg rounded-tr-bl-6xl overflow-hidden w-full bg-neutral-200/50">
            <img src={recipe.image || "https://placehold.co/600x400"} alt={recipe.title}
                 className="w-full rounded-b-6xl h-56 object-cover hover:scale-x-105 transform transition-all duration-300"/>

            <div className={'p-4'}>
                <Link href={`/recipe/${recipe.id}`}>
                    <h2 className="text-base tracking-wider font-bold hover:underline">{recipe.title}</h2>
                </Link>
                <p className="text-sm font-extralight opacity-65 text-ellipsis line-clamp-2">{recipe.description}</p>
                <hr className={"my-2"}/>
                <div className="flex justify-between items-center mt-2">
                    <p className={"font-light text-sm"}>{recipe.likes} likes • Easy</p>
                    <Link href={"/author/" + recipe.author.id}>
                        <div className="flex gap-2 items-center">
                            <p className={'text-sm font-light'}>{recipe.author.name}</p>
                            <img src={recipe.author.image} alt={recipe.author.name} className="w-6 h-6 rounded-full"/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export function Icon({className}: { className?: string }) {
    return (
        <div
            className={`${className} w-8 blur-sm h-8 bg-pastelLavender-700 rounded-full shadow-innerXl bg-transparent border-pastelLavender-400 border-2`}></div>
    )
}

