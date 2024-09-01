import {UploadButton} from "@/src/components/uploadthing";
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function AddRecipe() {
    const session = useSession();

    const [image, setImage] = useState<string>();

    if (session) {
        return (
            <div className={"flex flex-col gap-4 rounded-xl p-2"}>
                <h1 className={"font-bold text-xl tracking-wide text-center text-blue-mint-text"}>+ Add a recipe</h1>
                <form action={"/api/recipe"} method={"PUT"}
                      className={"flex flex-col gap-2"}>
                    <input className={"w-full border-2 rounded-xl border-blue-mint-dark p-2"} type="text" id="title"
                           name="title" required placeholder={"Name..."}/>
                    <textarea className={"w-full border-2 rounded-xl border-blue-mint-dark p-2"} id="description"
                              name="description" placeholder={"Description..."} required/>
                    <UploadButton
                        endpoint={"imageUploader"}
                        className={"ut-button:bg-blue-mint-lighter/5 ut-button:border--blue-mint-light ut-button:border-4 ut-button:rounded-full ut-label:text-blue-mint-text ut-button:text-blue-mint-text ut-button:shadow-lg ut-button:w-full"}
                        onClientUploadComplete={(res) => {
                            setImage(res[0].url);
                        }}
                    />
                    <input type="hidden" name="image" value={image}/>
                    <button type="submit"
                            className={"bg-blue-mint-lighter mt-8 w-full text-blue-mint-text p-2 rounded-full shadow-lg"}>
                        Save
                    </button>
                </form>
            </div>
        )
            ;
    }

    return <div>You must be signed in to view the protected content on this page.</div>;
}
