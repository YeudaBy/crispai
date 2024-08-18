import {RecipePreview} from "@/src/model/Recipe";
import Link from "next/link";
import React from "react";

export function RecipeCard({recipe}: { recipe: RecipePreview }) {
    return (
        <div
            className="shadow-lg rounded-br-3xl rounded-tl-3xl hover:translate-x-2 transform transition-all duration-300 overflow-hidden">
            <img src={recipe.image} alt={recipe.title}
                 className="rounded-tl-3xl w-full h-48 object-cover hover:scale-x-105 transform transition-all duration-300"/>
            <div className={'p-4'}>
                <Link href={`/recipe/${recipe.id}`}>
                    <h2 className="text-xl font-bold hover:underline">{recipe.title}</h2>
                </Link>
                <p className="text-sm">{recipe.description}</p>
                <hr className={"my-2"}/>
                <div className="flex justify-between items-center mt-2">
                    <Link href={"/author/" + recipe.user.id}>
                        <div className="flex gap-2 items-center">
                            <img src={recipe.user.image} alt={recipe.user.name} className="w-8 h-8 rounded-full"/>
                            <p className={'text-sm'}>{recipe.user.name}</p>
                        </div>
                    </Link>
                    <div className={"flex justify-between items-center gap-2"}>
                        <div className="flex gap-2 items-center">
                            <p>40</p>
                            <Icon/>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p>Share</p>
                            <Icon/>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p>Save</p>
                            <Icon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function Icon({className}: { className?: string }) {
    return (
        <div
            className={`${className} w-8 blur-sm h-8 bg-pastelLavender-200 rounded-full shadow-innerXl bg-transparent border-pastelLavender-400 border-2`}></div>
    )
}

