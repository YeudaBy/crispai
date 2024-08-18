import {useSession} from "next-auth/react";

export default function AddRecipe() {
    const session = useSession();

    if (session) {
        return (
            <div>
                <h1>Add a recipe</h1>
                <form action={"/api/add_recipe"} method={"post"}
                      className={"rounded-xl bg-pastelLavender-50 flex flex-col gap-3 p-4 m-2"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" required/>
                    <button type="submit"
                            className={"bg-pastelLavender-800 text-pastelPurple-100 p-2 rounded-full shadow-lg"}>
                        Add recipe
                    </button>
                </form>
            </div>
        );
    }

    return <div>You must be signed in to view the protected content on this page.</div>;
}
