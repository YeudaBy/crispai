import {UploadButton} from "@/src/components/uploadthing";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";

export default function AddRecipe() {
    const session = useSession();

    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session) {
            const res = await fetch("/api/recipe", {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    description,
                    images
                }),
            });
            if (res.ok) {
                console.log("Recipe added!");
                const json = await res.json();
                void router.push(`/recipe/${json.id}`);
            } else {
                console.error("Failed to add recipe!");
            }
        }
    };

    if (session) {
        return (
            <div className={"flex flex-col gap-4 rounded-xl p-2"}>
                <h1 className={"font-bold text-xl tracking-wide text-center text-blue-mint-text"}>+ Add a recipe</h1>
                <form className={"flex flex-col gap-2"}
                      onSubmit={onSubmit}
                >
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                           className={"w-full border-2 rounded-xl border-blue-mint-dark p-2"} type="text" id="title"
                           name="title" required placeholder={"Name..."}/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                              className={"w-full border-2 rounded-xl border-blue-mint-dark p-2"} id="description"
                              name="description" placeholder={"Description..."} required/>


                    <UploadButton
                        endpoint={"imageUploader"}
                        className={"ut-button:bg-blue-mint-lighter/5 ut-button:border--blue-mint-light ut-button:border-4 ut-button:rounded-full ut-label:text-blue-mint-text ut-button:text-blue-mint-text ut-button:shadow-lg ut-button:w-full"}
                        onClientUploadComplete={(res) => {
                            const urls = res.map((r) => r.url);
                            setImages(prevState => [...prevState, ...urls]);
                        }}
                    />

                    {images.map((url, index) => (
                        <img key={index} src={url} alt={"Uploaded image"} className={"w-full rounded-xl"}/>
                    ))}

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
