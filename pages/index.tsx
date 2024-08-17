import {Inter} from "next/font/google";
import {RecipePreview} from "@/src/model/Recipe";
import Link from "next/link";


const inter = Inter({subsets: ["latin"]});

export default function Home(props: { byLikes: RecipePreview[] }) {
    return (
        <main
            className={`min-h-screen flex flex-col justify-between ${inter.className}`}
        >
            <section className={'grow p-2'}>
                <SearchBar/>
                <h1 className="text-4xl font-bold text-center">Welcome to <span
                    className={'text-amber-500'}>CrispAI</span>
                </h1>
                <p className="text-lg grow text-center">The future of <span className={'text-amber-500'}>AI</span> is
                    here</p>

                <div className="flex flex-col gap-4 justify-center p-4">
                    {
                        (props?.byLikes || [undefined, undefined, undefined])?.map((r, i) => <RecipeCard item={r}
                                                                                                         key={i}/>)
                    }
                </div>
            </section>
            <BottomNavBar/>
        </main>
    );
}

export function RecipeCard({item}: { item: RecipePreview }) {
    const recipe: RecipePreview = {
        title: "Recipe Name",
        description: "Recipe Description, long enough to be interesting, short enough to be read: Recipe Description, long enough to be interesting, short enough to be read",
        likes: 43,
        user: {
            name: "Yeuda",
            image: "https://avatars.githubusercontent.com/u/68661509?v=4",
            verified: true,
            id: 1
        },
        id: 1,
        date: new Date(),
        image: "https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill",
        categories: [],
        tags: []
    }

    return (
        <div className="shadow-2xl rounded-br-3xl rounded-tl-3xl hover:translate-x-2 transform transition-all duration-300 overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="rounded-tl-3xl w-full h-48 object-cover hover:scale-x-105 transform transition-all duration-300"/>
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
                            <p>{recipe.likes}</p>
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


function BottomNavBar() {
    return (
        <div
            className={`sticky bottom-2 align-bottom h-fit rounded-full m-3 max-w-4xl 
            shadow-pastelLavender-100 shadow-sm mb-4 bg-pastelLavender-50 
            flex justify-around items-center gap-32 text-pastelLavender-700`}>
            <div
                className={"flex rounded-full border-pastelLavender-100 w-full border-2 items-center justify-center text-sm gap-2 p-2 m-2 bg-pastelLavender-50"}>
                Home
                <Icon/>
            </div>
            <div
                className={`flex items-center shadow-lg justify-center text-sm gap-1 rounded-full
                 flex-col absolute -top-2/4 p-4 w-32 bg-pastelLavender-50`}>
                <Icon/>
                <p>
                    Explore
                </p>
            </div>
            <div
                className={"flex items-center justify-center border-pastelLavender-100 w-full border-2 text-sm gap-2 rounded-full p-2 m-2 bg-pastelLavender-50"}>
                <Icon/>
                Profile
            </div>

            {/*<Item className={""} icon={<Icon/>} text={"Search"}/>*/}
            {/*<Item icon={<Icon/>} text={"Add"}/>*/}
        </div>
    )
}

function Icon() {
    return (
        <div className="w-10 blur-sm h-10 bg-pastelLavender-200 rounded-full shadow-innerXl bg-transparent border-2"></div>
    )
}

function SearchBar() {
    return (
        <div className={"rounded-full items-center w-full m-2 p-2 flex gap-2 bg-pastelLavender-100 justify-center"}>
            <Icon/>
            <input type="text" placeholder={"Search"}
                   className={"grow h-full accent-pastelLavender-500 bg-transparent rounded-full text-sm p-2 ring-0"}/>
        </div>
    )
}


export async function getServerSideProps() {
    // const byLikes = await recipeRepository.getRecipesByLikes()
    // console.log(byLikes)
    console.log("test")

    return {
        props: {
            // byLikes
        }
    }
}
