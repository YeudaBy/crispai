import {RecipePreview} from "@/src/model/Recipe";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import {useSession} from "next-auth/react";
import {UploadDropzone} from "@/src/components/uploadthing";
import {Ingredient} from "@/src/model/Ingredient";
import Image from "next/image";
import {NextPageWithLayout} from "@/pages/_app";
import {Layout} from "@/src/components/layout";
import React from "react";


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

type PageType = InferGetServerSidePropsType<typeof getServerSideProps>

const Page: NextPageWithLayout<PageType> = ({recipe}: PageType) => {

    const session = useSession()
    // @ts-ignore  todo
    const isOwner = session.data?.user?.id === recipe.author.id

    const [toolBoxOpen, setToolBoxOpen] = React.useState(false)

    return (
        <>
            <div
                style={{
                    background: `url(${recipe.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className={"h-56 w-full p-4 fixed"}>
                {(!recipe.image && isOwner) && <UploadDropzone
                    className={"bg-brown-lighter p-0 ut-button:text-sm ut-button:bg-brown-text ut-button:mb-2 ut-label:text-brown-text"}
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
                    <p className={'text-sm opacity-65'}>{recipe.likes} Likes • {recipe.date} • {recipe.account.name}</p>
                    <hr className={"my-2"}/>
                </div>

                <div className={"rounded-tr-bl-3xl border-brown border-4 p-4"}>
                    <div className={""}>
                        <h2 className={"text-xl font-bold text-brown-dark"}>Ingredients</h2>
                        <ul>
                            {demoIngredients().map((ingredient, index) => (
                                <>
                                    {index !== 0 && <hr/>}
                                    <li key={index} className={"my-2 flex gap-1 items-center"}>
                                        <span
                                            className={"font-mono text-brown-dark/85 font-bold"}>{ingredient.amount}</span>
                                        <span className={"text-brown-dark/75"}>{ingredient.unit}</span>
                                        <span
                                            className={"font-bold tracking-wider text-brown-dark"}>{ingredient.name}</span>
                                        {!ingredient.required &&
                                            <span className={"text-brown-dark/50 text-sm"}> (Optional)</span>}

                                        <div className={"flex-grow"}/>
                                        <div className={"hover:bg-brown-lighter p-1 rounded-md cursor-pointer"}>
                                            <Image
                                                src={"/add_shopping_cart_mt.svg"}
                                                alt={"Add to shopping cart"}
                                                className={"filter-brown-dark"}
                                                width={20} height={20}/>
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={"bg-brown-lighter/50 shadow-md shadow-brown/50 rounded-tl-br-3xl p-4 mt-2"}>
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

            <div
                onClick={() => setToolBoxOpen(!toolBoxOpen)}
                className={`fixed bottom-6 right-6 bg-brown-light p-2 rounded-xl shadow-lg shadow-brown-text
            hover:scale-125 cursor-pointer transition-all duration-300`}>
                <Image src={"/kitchen_google.svg"} alt={"Open toolbox"} width={32} height={32}/>
            </div>

            <ToolBox isOpen={toolBoxOpen} onClose={() => setToolBoxOpen(false)} recipe={recipe}/>
        </>
    )
}

function ToolBox({isOpen, onClose, recipe}: {
    onClose: () => void, isOpen: boolean, recipe: any
}) {
    const workerRef = React.useRef<Worker>()
    React.useEffect(() => {
        if (!window.Worker) return
        workerRef.current = new Worker("/clock-worker.js", {type: "module"})
    }, [])

    const [alarmMs, setAlarmMs] = React.useState(0)

    const Button = ({text, onClick}: { text: string, onClick: () => void }) => {
        return <button onClick={onClick} className={"bg-brown-lighter p-2 rounded-md m-1"}>
            {text}
        </button>
    }

    return <div
        className={`backdrop fixed top-0 left-0 w-full h-full bg-brown-dark/50 z-10 flex justify-center items-center
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-300`}>

        <div
            className={`relative bg-white p-4 rounded-xl drop-shadow-lg drop-shadow-brown-text/50 w-3/4 h-fit
        ${isOpen ? "scale-100" : "scale-0 pointer-events-none"} transition-all duration-300`}>
            <button onClick={onClose}
                    className={"absolute -top-2 -right-2 bg-white p-2 rounded-full border-2 border-b-brown-light"}>
                <Image src={"/close_google.svg"} className={"filter-brown-dark"} alt={"Close"} width={20} height={20}/>
            </button>
            <h2 className={"text-xl font-bold"}>Kitchen Toolbox</h2>
            <hr/>
            <ul>
                <li>
                    <Button text={"Start Timer"} onClick={() => {
                        workerRef.current?.postMessage({type: "start", ms: alarmMs})
                    }}/>
                </li>
                <li>
                    <Button text={"Stop Timer"} onClick={() => {
                        workerRef.current?.postMessage({type: "stop"})
                    }}/>
                </li>
                <li>
                    <Button text={"Reset Timer"} onClick={() => {
                        workerRef.current?.postMessage({type: "reset"})
                    }}/>
                </li>
                <li>
                    <input
                        type={"number"}
                        value={alarmMs}
                        onChange={(e) => setAlarmMs(Number(e.target.value))}
                        className={"p-2 rounded-md border-brown border-2"}
                    />
                </li>
            </ul>
        </div>

    </div>
}


Page.getLayout = (page) => (
    <Layout isHome={false} bnb={<></>}>
        {page}
    </Layout>
)

export default Page;

function demoIngredients(): Ingredient[] {
    return [
        {id: 0, name: "flour", amount: "2", unit: "cups", required: true},
        {id: 1, name: "sugar", amount: "1", unit: "cup", required: true},
        {id: 2, name: "butter", amount: "1", unit: "stick", required: true},
        {id: 3, name: "eggs", amount: "2", unit: "", required: false},
        {id: 4, name: "milk", amount: "1", unit: "cup", required: true},
    ]
}
