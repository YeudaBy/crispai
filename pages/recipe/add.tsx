import {UploadDropzone} from "@/src/components/uploadthing";
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function AddRecipe() {
    const session = useSession();

    const [image, setImage] = useState<string>();

    if (session) {
        return (
            <div className={"flex flex-col gap-2 rounded-xl bg-pastelLavender-50 p-4 m-6"}>
                <h1>Add a recipe</h1>
                <form action={"/api/recipe"} method={"PUT"}
                      className={"flex flex-col gap-2"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" required/>
                    <UploadDropzone
                        endpoint={"imageUploader"}
                        onClientUploadComplete={(res) => {
                            setImage(res[0].url);
                        }}
                    />
                    <input type="hidden" name="image" value={image}/>
                    <button type="submit"
                            className={"bg-pastelLavender-800 text-pastelPurple-100 p-2 rounded-full shadow-lg"}>
                        Add recipe
                    </button>
                </form>
            </div>
        )
            ;
    }

    return <div>You must be signed in to view the protected content on this page.</div>;
}
