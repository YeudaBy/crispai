import {UploadButton} from "@/src/components/uploadthing";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import TextInput from "@/src/components/input";
import {RiDeleteBinLine} from "@remixicon/react";

export default function AddRecipe() {
    const session = useSession();

    const [images, setImages] = useState<string[]>([]);
    const [imagesLoading, setImagesLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [titleLoading, setTitleLoading] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [descriptionLoading, setDescriptionLoading] = useState<boolean>(false);
    const [newId, setNewId] = useState<string>("");
    const [atts, setAtts] = useState<{ key: string, value: string | number }[]>([]);

    const router = useRouter();

    const submit = async () => {
        if (session) {
            setTitleLoading(true);
            const res = await fetch("/api/recipe", {
                method: "PUT",
                body: JSON.stringify({
                    title
                }),
            });
            if (res.ok) {
                console.log("Recipe added!");
                const json = await res.json();
                setNewId(json.id);
            } else {
                console.error("Failed to add recipe!");
            }
            setTitleLoading(false);
        }
    };

    const saveChanges = async () => {
        if (session && newId) {
            const res = await fetch("/api/recipe", {
                method: "POST",
                body: JSON.stringify({
                    id: newId,
                    title,
                    description,
                    images
                }),
            });
            if (res.ok) {
                console.log("Recipe updated!");
                router.push(`/recipe/${newId}`);
            } else {
                console.error("Failed to update recipe!");
            }
        }
    }

    if (session) {
        return (
            <div className={"flex flex-col gap-4 rounded-xl p-2"}>
                <h1 className={"font-bold text-xl tracking-wide text-center text-blue-mint-text"}>Add a recipe</h1>
                <form className={"flex flex-col gap-2"}>
                    <TextInput loading={titleLoading}
                               value={title}
                               setValue={setTitle}
                               placeholder={"Name..."}
                               onSave={submit}/>
                    <TextInput
                        value={description}
                        loading={descriptionLoading}
                        setValue={setDescription}
                        mexLine={5}
                        onSave={() => {
                            setDescriptionLoading(true);
                            saveChanges().then(() => setDescriptionLoading(false));
                        }}
                        placeholder={"Description..."}/>

                    <div className={"flex flex-col"}>
                        {atts.map((att, index) => (
                            <div key={index} className={"flex flex-row gap-2"}>
                                <TextInput
                                    value={att.key}
                                    setValue={(v) => {
                                        const newAtts = [...atts];
                                        newAtts[index] = {key: v, value: att.value};
                                        setAtts(newAtts);
                                    }}
                                    placeholder={"Attribute..."}
                                />
                                <TextInput
                                    value={att.value.toString()}
                                    setValue={(v) => {
                                        const newAtts = [...atts];
                                        newAtts[index] = {key: att.key, value: v};
                                        setAtts(newAtts);
                                    }}
                                    placeholder={"Value..."}
                                />
                                <button type={"button"} onClick={() => {
                                    const newAtts = [...atts];
                                    newAtts.splice(index, 1);
                                    setAtts(newAtts);
                                }} className={"bg-red-500 text-white p-2 rounded-full shadow-lg"}>
                                    <RiDeleteBinLine/>
                                </button>
                            </div>
                        ))}
                        <button type={"button"} onClick={() => setAtts([...atts, {key: "", value: ""}])}
                                className={"bg-blue-mint-lighter text-blue-mint-text p-2 rounded-full shadow-lg"}>
                            Add attribute
                        </button>
                    </div>


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
        );
    }

    return <div>You must be signed in to view the protected content on this page.</div>;
}
