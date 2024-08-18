import {createRouteHandler} from "uploadthing/next-legacy";
import {ourFileRouter} from "@/src/other/uploadthing";


export default createRouteHandler({
    router: ourFileRouter,
});
