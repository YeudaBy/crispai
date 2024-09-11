import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {auth} from "@/pages/api/auth/[...nextauth]";
import {getProviders, signIn} from "next-auth/react";
import {NextPageWithLayout} from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import {RiGoogleFill} from "@remixicon/react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const SignIn: NextPageWithLayout<Props> = ({providers}: Props) => {
    return (
        <div
            className={"flex flex-col-reverse lg:flex-row gap-12 justify-center items-center w-screen bg-brown-lighter/75 h-screen"}>
            <div className={"w-full max-h-3/5"}>
                <div
                    className={`p-6 py-10 gap-6 h-full m-10 lg:m-auto lg:w-2/3 rounded-tl-br-10xl shadow-lg shadow-brown/75 
                    bg-blue-mint-lighter flex flex-col items-center justify-center transition-all duration-300 hover:rounded-tr-bl-10xl`}>
                    <Link href={"/"}>
                        <Image src={"/crispai.svg"} width={200} height={200} alt={"Crispai Logo"}/>
                    </Link>

                    <p className={"text-start text-sm text-brown-text/75 tracking-wide"}>
                        <span className={"font-semibold text-base"}>Welcome to Crispai!</span>
                        <br/>
                        <br/>
                        Join a vibrant community of food lovers where sharing and discovering recipes has never been
                        more exciting.
                        <br/>
                        <br/>
                        ✨ Share Your Culinary Creations: Post your favorite recipes and inspire others.
                        <br/>
                        🍳 Discover New Flavors: Explore dishes from chefs and home cooks around the world.
                        <br/>
                        🤖 AI-Powered Recipes: Generate personalized recipes tailored just for you.
                        <br/>
                        ⭐ Get Recommendations: Receive suggestions based on your tastes and preferences.
                        <br/>
                        <br/>
                        <span
                            className={"font-semibold text-base"}>Sign in now to start your culinary journey with Crispai!</span>
                    </p>
                </div>
            </div>

            <div className={"w-full h-3/5"}>
                <div
                    className={`bg-white h-full shadow-lg shadow-brown/75 m-10 lg:m-auto lg:w-2/3 rounded-tr-bl-10xl hover:rounded-tl-br-10xl transition-all duration-300
                     p-6 flex gap-6 flex-col items-center justify-center ease-out`}>
                    {Object.values(providers).map((provider) => (
                        <button
                            className={`bg-blue-mint-lighter text-blue-mint-text p-4 w-full text-center shadow-sm shadow-blue-mint-dark transition-shadow duration-300
                                hover:shadow-md hover:shadow-blue-mint-dark cursor-pointer rounded-tr-bl-2xl flex justify-center items-center gap-2`}
                            key={provider.name}
                            onClick={() => signIn(provider.id)}>
                            <RiGoogleFill/>
                            <p className={"grow tracking-wider"}>Sign in with <span
                                className={"font-bold"}>{provider.name}</span></p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await auth(context.req, context.res)
    console.log(context.query)

    if (session) {
        return {redirect: {destination: context.query.ref ?? "/", permanent: false}}
    }

    const providers = await getProviders()

    return {
        props: {providers: providers ?? []},
    }
}


SignIn.getLayout = (page: any) => page

export default SignIn;
