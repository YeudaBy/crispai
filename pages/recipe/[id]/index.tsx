import {RecipePreview} from "@/src/model/Recipe";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import {useSession} from "next-auth/react";
import {UploadDropzone} from "@/src/components/uploadthing";
import {Ingredient} from "@/src/model/Ingredient";


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
    const isOwner = session.data?.user?.id === recipe.author.id

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

            <div className={"bg-white rounded-tl-3xl rounded-tr-3xl w-full relative top-52 p-2"}>
                <div className={""}>
                    <h1 className={"text-3xl font-bold"}>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <p className={'text-sm opacity-65'}>{recipe.likes} Likes • {recipe.date} • {recipe.author.name}</p>
                    <hr className={"my-2"}/>
                </div>

                <div className={"bg-neutral-200 rounded-tr-bl-3xl p-4"}>
                    <div className={""}>
                        <h2 className={"text-xl font-bold"}>Ingredients</h2>
                        <ul>
                            {demoIngredients().map((ingredient, index) => (
                                <>
                                    {index !== 0 && <hr/>}
                                    <li key={index} className={"my-2 flex gap-1"}>
                                        <span className={"font-mono"}>{ingredient.amount}</span>
                                        <span>{ingredient.unit}</span>
                                        <span className={"font-bold tracking-wider"}>{ingredient.name}</span>
                                        {ingredient.required && <span className={"text-red-500"}> *</span>}

                                        <div className={"flex-grow"}/>
                                        <div>
                                            Add to shopping list
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={"bg-neutral-200 rounded-tl-br-3xl p-4 mt-2"}>
                    <div className={""}>
                        <h2 className={"text-xl font-bold"}>Instructions</h2>
                        <p className={"whitespace-pre-line"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc
                            consectetur

                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc

                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc
                        </p>
                    </div>
                </div>

                <div className={"bg-neutral-200 rounded-tr-bl-3xl p-4 mt-2"}>
                    <div className={""}>
                        <h2 className={"text-xl font-bold"}>Comments</h2>
                        <p className={"whitespace-pre-line"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc
                            consectetur

                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc

                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec nunc
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

function demoIngredients(): Ingredient[] {
    return [
        {id: 0, name: "flour", amount: "2", unit: "cups", required: true},
        {id: 1, name: "sugar", amount: "1", unit: "cup", required: true},
        {id: 2, name: "butter", amount: "1", unit: "stick", required: true},
        {id: 3, name: "eggs", amount: "2", unit: "", required: false},
        {id: 4, name: "milk", amount: "1", unit: "cup", required: true},
    ]
}
