import {RecipePreview} from "@/src/model/Recipe";
import React from "react";
import {useRouter} from "next/router";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import Image from "next/image";
import {Category} from "@/src/model/Category";
import Link from "next/link";
import { RecipeCardLarge, Input, Button, RecipeListSkeleton } from "@/src/components/ui";
import { RiSearchLine } from "@remixicon/react";
import { cn } from "@/src/utils/cn";


export default function Home(props: {
    byLikes: RecipePreview[],
    categories: Category[]
}) {
    const [query, setQuery] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()
    
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim() !== '') {
            setIsLoading(true)
            await router.push(`/search/${encodeURIComponent(query.trim())}`)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
            {/* Hero Search Section */}
            <div className="px-4 py-6 bg-white">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-display-md font-bold text-neutral-900 mb-2">
                            מה נבשל היום?
                        </h1>
                        <p className="text-body-lg text-neutral-600">
                            גלו מתכונים מדהימים מהקהילה שלנו
                        </p>
                    </div>
                    
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="חפש מתכונים, מצרכים או שפים..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                size="lg"
                                leftIcon={<RiSearchLine size={20} />}
                                className="w-full"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            size="lg"
                            loading={isLoading}
                            disabled={!query.trim()}
                            className="px-8"
                        >
                            חפש
                        </Button>
                    </form>
                </div>
            </div>

            {/* Categories Section */}
            {props.categories && props.categories.length > 0 && (
                <div className="px-4 py-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-h2 font-semibold text-neutral-900 mb-4 text-center">
                            קטגוריות פופולריות
                        </h2>
                        
                        <div className="flex gap-3 flex-wrap justify-center">
                            {props.categories.map((category) => (
                                <Link 
                                    key={category.id} 
                                    href={`/category/${category.id}`}
                                    className="group"
                                >
                                    <div className={cn(
                                        "flex items-center gap-2 bg-white border border-neutral-200 rounded-2xl px-4 py-3",
                                        "transition-all duration-200 ease-smooth",
                                        "hover:shadow-elevation-2 hover:border-brown-300 hover:scale-105",
                                        "active:scale-95"
                                    )}>
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brown-100 to-blue-mint-100 flex items-center justify-center overflow-hidden">
                                            {category.image ? (
                                                <Image
                                                    src={category.image}
                                                    width={32}
                                                    height={32}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-brown-600 text-sm font-medium">
                                                    {category.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-body font-medium text-neutral-700 group-hover:text-brown-600">
                                            {category.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Recipes Section */}
            <div className="px-4 py-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-h2 font-semibold text-neutral-900 mb-6 text-center">
                        המתכונים הפופולריים ביותר
                    </h2>
                    
                    {props.byLikes && props.byLikes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {props.byLikes.map((recipe) => (
                                <RecipeCardLarge 
                                    key={recipe.id} 
                                    recipe={recipe}
                                    showActions={true}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    ) : (
                        <RecipeListSkeleton count={6} />
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const byLikes = await recipeRepository.getRecipesByLikes()
    const categories = await recipeRepository.getCategories()

    console.log(byLikes)

    return {
        props: {
            byLikes,
            categories
        }
    }
}
