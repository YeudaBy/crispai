import {UploadDropzone} from "@/src/components/uploadthing"
import React from "react"

export default function Image() {
    const [images, setImages] = React.useState<string[]>([])
    return (
        <div>
            <h1>Image</h1>

            <UploadDropzone
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                }}
            />

            <div className={"flex gap-2"}>
                {images.map((image) => (
                    <>
                        <img src={image} key={image} className={"w-32 h-32 object-cover"}/>
                        <a href={image} target={"_blank"}>Open</a>
                    </>
                ))}
            </div>
        </div>
    )
}
