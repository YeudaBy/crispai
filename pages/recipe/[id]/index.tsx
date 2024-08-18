import {RecipePreview} from "@/src/model/Recipe";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import {useSession} from "next-auth/react";
import {UploadDropzone} from "@/src/components/uploadthing";


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
    const isOwner = session.data?.user?.id === recipe.user.id

    return (
        <>
            <div
                style={{
                    background: `url(${recipe.image}), #D0F5E5`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className={"h-56 w-full p-4 fixed"}>
                {(!recipe.image && isOwner) && <UploadDropzone
                    className={"p-0 ut-button:text-sm ut-button:bg-pastelMint-800 ut-button:mb-2 ut-label:text-pastelMint-800"}
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                        const url = res[0].url
                        if (url) {
                            fetch("/api/recipe", {
                                method: "POST",
                                body: JSON.stringify({
                                    id: recipe.id,
                                    image: url
                                })
                            }).then(() => {
                                window.location.reload()
                            })
                        }
                    }}
                />}
            </div>

            <div className={"bg-white rounded-tl-3xl rounded-tr-3xl w-full relative top-52"}>
                <div className={"p-4"}>
                    <h1 className={"text-3xl font-bold"}>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <p className={'text-sm opacity-65'}>{recipe.likes} Likes • {recipe.date} • {recipe.user.name}</p>
                    <hr className={"my-2"}/>
                </div>


                <div className={"h-96"}
                >
                </div>
                <div className={"h-96"}
                >
                </div>
                <div className={"h-96"}
                >
                </div>
            </div>


        </>
    )
}
