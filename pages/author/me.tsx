import {recipeRepository} from "@/src/repositories/recipeRepository";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {RecipePreview} from "@/src/model/Recipe";
import {auth} from "@/pages/api/auth/[...nextauth]";
import React from "react";
import {Dialog} from "@/src/components/dialog";
import {UploadButton} from "@/src/components/uploadthing";
import {Icon, RecipeCardLarge} from "@/src/components/recipe";
import {useRouter} from "next/router";
import Link from "next/link";
import {GoToLogin} from "@/src/components/auth";
import {useSession} from "next-auth/react";

export const getServerSideProps = (async (context) => {
    const session = await auth(context.req, context.res);
    const myId = session?.user.id as string;
    const recipes = await recipeRepository.getRecipesByUser(myId);
    return {props: {recipes}}
}) satisfies GetServerSideProps<{
    recipes: RecipePreview[],
    // author: Author | null
}>


export default function Page({recipes}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);
    const [newName, setNewName] = React.useState("");
    const {status, data} = useSession()

    console.log(recipes)
    if (!data?.user) {
        return <GoToLogin/>
    }
    return (
        <>
            <div className={"flex flex-row gap-2 p-2 items-center"}>
                <div
                    onClick={() => setProfileDialogOpen(true)}
                    className={"rounded-full h-20 w-20 overflow-hidden border-4 border-pastelBlue-400"}>
                    {
                        data?.user.image ?
                            <img src={data?.user.image} alt={data?.user.name || ""}/> :
                            <div className={"flex justify-center items-center h-full"}>
                                <span className={"text-3xl"}>{data?.user.name[0]}</span>
                            </div>
                    }
                </div>

                <div className={"grow"}>
                    {
                        newName.length > 0 ?
                            <input
                                type={"text"}
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => {
                                    setNewName("")
                                    fetch("/api/author", {
                                        method: "POST",
                                        body: JSON.stringify({name: newName}),
                                    })
                                }}
                            />
                            : <h1 className={"font-bold"}
                                  onClick={() => setNewName(data?.user.name)}>{data?.user.name}</h1>
                    }
                    {/*{author.bio && <p dangerouslySetInnerHTML={{__html: author.bio}}></p>}*/}
                </div>

                <div className={"flex flex-col gap-2 items-center"}>
                    <Icon/>
                    <p className={"text-sm"}>Settings</p>
                </div>
            </div>

            <div className={"flex flex-row gap-2 p-2 items-center"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"font-bold"}>Bio</h1>
                    {/*<p>{author.bio}</p>*/}
                </div>
            </div>

            <div className={"flex flex-row gap-2 p-2 items-center justify-around"}>
                <div className={"flex flex-col items-center"}>
                    <p className={"text-sm"}>Recipes</p>
                    <p className={"font-bold"}>{recipes.length}</p>
                </div>
                <div className={"flex flex-col items-center"}>
                    <p className={"text-sm"}>Followers</p>
                    <p className={"font-bold"}>0</p>
                </div>
                <div className={"flex flex-col items-center"}>
                    <p className={"text-sm"}>Following</p>
                    <p className={"font-bold"}>0</p>
                </div>
            </div>

            <div className={"flex flex-col gap-2 p-2"}>
                <Link href={"/recipe/add"}>
                    <div className={"rounded-full bg-pastelMint-900 text-pastelMint-200 p-4 w-full text-center"}>
                        Add New Recipe
                    </div>
                </Link>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <RecipeCardLarge recipe={recipe}/>
                    </div>
                ))}
            </div>

            <Dialog
                open={profileDialogOpen}
                onClose={() => setProfileDialogOpen(false)}
                className={"rounded-3xl p-6 shadow-2xl bg-pastelBlue-50"}
                title={"Change Image Picture"}>
                <div>
                    <UploadButton
                        endpoint={"imageUploader"}
                        className={"ut-button:bg-pastelBlue-700 ut-button:rounded-full m-4"}
                        onClientUploadComplete={(res) => {
                            fetch("/api/author/image", {
                                method: "POST",
                                body: JSON.stringify({url: res[0].url}),
                            })
                        }}
                    />
                    <hr/>
                    <button
                        onClick={() => {
                            setProfileDialogOpen(false);
                            fetch("/api/author/image", {method: "DELETE",})
                        }}
                        className={"border-2 border-pastelBlue-400 px-4 rounded-full text-sm py-1"}
                    >
                        Remove Image
                    </button>
                </div>
            </Dialog>
        </>
    )
}
