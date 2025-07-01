import {Recipe} from "@/src/model/Recipe";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {recipeRepository} from "@/src/repositories/recipeRepository";
import {useSession} from "next-auth/react";
import {UploadDropzone} from "@/src/components/uploadthing";
import Image from "next/image";
import {NextPageWithLayout} from "@/pages/_app";
import {Layout} from "@/src/components/layout";
import React from "react";
import {Ingredient} from "@/src/model/Ingredient";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button,
  Input,
  Spinner,
  LoadingScreen
} from "@/src/components/ui";
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiShareLine, 
  RiBookmarkLine,
  RiBookmarkFill,
  RiTimeLine,
  RiUserLine,
  RiShoppingCartLine,
  RiPlayLine,
  RiPauseLine,
  RiStopLine,
  RiRefreshLine,
  RiCloseLine,
  RiToolsLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiCheckLine,
  RiAddLine
} from "@remixicon/react";
import { cn } from "@/src/utils/cn";

export const getServerSideProps = (async (context) => {
    const id = context.params?.id as string | undefined;
    if (!id) {
        return {notFound: true}
    }
    const recipe = await recipeRepository.getRecipe(id)
    if (!recipe) {
        return {notFound: true}
    }
    return {props: {recipe}}
}) satisfies GetServerSideProps<{ recipe: Recipe }>

type PageType = InferGetServerSidePropsType<typeof getServerSideProps>

const Page: NextPageWithLayout<PageType> = ({recipe}: PageType) => {
    const session = useSession()
    const isOwner = session.data?.user?.id === recipe.account.id
    const [toolBoxOpen, setToolBoxOpen] = React.useState(false)
    const [isLiked, setIsLiked] = React.useState(false)
    const [isSaved, setIsSaved] = React.useState(false)
    const [likes, setLikes] = React.useState(recipe.likes)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikes((prev: number) => isLiked ? prev - 1 : prev + 1)
    }

    const handleSave = () => {
        setIsSaved(!isSaved)
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: recipe.description,
                url: window.location.href,
            })
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Image Section */}
            <div className="relative h-80 md:h-96 overflow-hidden">
                {recipe.main_image ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={recipe.main_image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                ) : isOwner ? (
                    <div className="w-full h-full bg-gradient-to-br from-brown-100 to-blue-mint-100 flex items-center justify-center">
                        <UploadDropzone
                            className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-dashed border-brown-300 ut-button:bg-brown-400 ut-button:text-white ut-label:text-brown-600"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                                const url = res[0].url
                                if (url) {
                                    fetch("/api/recipe", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            id: recipe.id,
                                            image: url
                                        })
                                    }).then(() => {
                                        window.location.reload()
                                    })
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brown-100 to-blue-mint-100 flex items-center justify-center">
                        <div className="text-center text-brown-600">
                            <div className="w-24 h-24 mx-auto mb-4 bg-brown-200 rounded-2xl flex items-center justify-center">
                                <span className="text-4xl">🍳</span>
                            </div>
                            <p className="text-body-lg">אין תמונה למתכון</p>
                        </div>
                    </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                        onClick={handleShare}
                    >
                        <RiShareLine size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                        onClick={handleSave}
                    >
                        {isSaved ? <RiBookmarkFill size={20} /> : <RiBookmarkLine size={20} />}
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative bg-white rounded-t-3xl -mt-6 min-h-screen">
                <div className="px-4 pt-6 pb-8">
                    {/* Recipe Header */}
                    <div className="mb-6">
                        <h1 className="text-display-md font-bold text-neutral-900 mb-3 leading-tight">
                            {recipe.title}
                        </h1>
                        
                        {recipe.description && (
                            <p className="text-body-lg text-neutral-600 mb-4 leading-relaxed">
                                {recipe.description}
                            </p>
                        )}

                        {/* Author & Stats */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brown-400 to-blue-mint-300 flex items-center justify-center overflow-hidden">
                                    {recipe.account.image ? (
                                        <Image 
                                            src={recipe.account.image} 
                                            alt={recipe.account.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <RiUserLine size={20} className="text-white" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-body font-semibold text-neutral-900">
                                        {recipe.account.name}
                                    </p>
                                    <p className="text-caption text-neutral-500">
                                        {new Date(recipe.date).toLocaleDateString('he-IL')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
                                        isLiked 
                                            ? "bg-error-50 text-error-600" 
                                            : "bg-neutral-100 text-neutral-600 hover:bg-error-50 hover:text-error-600"
                                    )}
                                >
                                    {isLiked ? (
                                        <RiHeartFill size={20} className="animate-scale-in" />
                                    ) : (
                                        <RiHeartLine size={20} />
                                    )}
                                    <span className="text-body font-medium">{likes}</span>
                                </button>

                                <div className="flex items-center gap-2 text-neutral-500">
                                    <RiTimeLine size={16} />
                                    <span className="text-caption">30 דק׳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recipe Sections */}
                    <div className="space-y-6">
                        <IngredientsSection ingredients={demoIngredients()} />
                        <InstructionsSection />
                        <CommentsSection comments={recipe.comments} />
                    </div>
                </div>
            </div>

            {/* Floating Kitchen Toolbox Button */}
            <Button
                variant="primary"
                size="icon-lg"
                className="fixed bottom-20 right-4 shadow-elevation-4 hover:shadow-elevation-5 z-30"
                onClick={() => setToolBoxOpen(true)}
            >
                <RiToolsLine size={24} />
            </Button>

            {/* Kitchen Toolbox Modal */}
            <KitchenToolbox 
                isOpen={toolBoxOpen} 
                onClose={() => setToolBoxOpen(false)} 
                recipe={recipe}
            />
        </div>
    )
}

// Ingredients Section Component
function IngredientsSection({ ingredients }: { ingredients: Ingredient[] }) {
    const [isOpen, setIsOpen] = React.useState(true)
    const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set())

    const toggleCheck = (id: string) => {
        const newChecked = new Set(checkedItems)
        if (newChecked.has(id)) {
            newChecked.delete(id)
        } else {
            newChecked.add(id)
        }
        setCheckedItems(newChecked)
    }

    return (
        <Card variant="outlined" className="overflow-hidden">
            <CardHeader 
                className="cursor-pointer bg-brown-50 hover:bg-brown-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <CardTitle className="text-h3 text-brown-900">מצרכים</CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-caption text-brown-600">
                            {ingredients.length} פריטים
                        </span>
                        {isOpen ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                    </div>
                </div>
            </CardHeader>

            <div className={cn(
                "transition-all duration-300 ease-smooth",
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}>
                <CardContent className="p-0">
                    <div className="divide-y divide-neutral-100">
                        {ingredients.map((ingredient, index) => (
                            <div 
                                key={ingredient.id} 
                                className="flex items-center gap-3 p-4 hover:bg-neutral-50 transition-colors"
                            >
                                <button
                                    onClick={() => toggleCheck(ingredient.id)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        checkedItems.has(ingredient.id)
                                            ? "bg-success-500 border-success-500 text-white"
                                            : "border-neutral-300 hover:border-success-400"
                                    )}
                                >
                                    {checkedItems.has(ingredient.id) && (
                                        <RiCheckLine size={14} className="animate-scale-in" />
                                    )}
                                </button>

                                <div className={cn(
                                    "flex-1 transition-all",
                                    checkedItems.has(ingredient.id) && "opacity-60 line-through"
                                )}>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-body font-semibold text-brown-600">
                                            {ingredient.amount}
                                        </span>
                                        <span className="text-body-sm text-brown-500">
                                            {ingredient.unit}
                                        </span>
                                        <span className="text-body font-medium text-neutral-900">
                                            {ingredient.name}
                                        </span>
                                        {!ingredient.required && (
                                            <span className="text-caption text-neutral-500">
                                                (אופציונלי)
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="text-brown-500 hover:text-brown-700 hover:bg-brown-100"
                                >
                                    <RiShoppingCartLine size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-brown-50 border-t border-brown-100">
                        <Button variant="outline" fullWidth className="text-brown-600 border-brown-300">
                            <RiShoppingCartLine size={16} />
                            הוסף הכל לרשימת קניות
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

// Instructions Section Component
function InstructionsSection() {
    const [isOpen, setIsOpen] = React.useState(true)
    const instructions = [
        "חממו את התנור ל-180 מעלות צלזיוס.",
        "בקערה גדולה, ערבבו את הקמח, הסוכר ואבקת האפייה.",
        "בקערה נפרדת, הקציפו את הביצים עם החלב והחמאה המומסת.",
        "יוצקים את התערובת הרטובה לתערובת היבשה ומערבבים עד לקבלת בצק חלק.",
        "יוצקים לתבנית משומנת ואופים למשך 25-30 דקות עד שהעוגה זהובה."
    ]

    return (
        <Card variant="outlined" className="overflow-hidden">
            <CardHeader 
                className="cursor-pointer bg-blue-mint-50 hover:bg-blue-mint-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <CardTitle className="text-h3 text-blue-mint-900">הוראות הכנה</CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-caption text-blue-mint-600">
                            {instructions.length} שלבים
                        </span>
                        {isOpen ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                    </div>
                </div>
            </CardHeader>

            <div className={cn(
                "transition-all duration-300 ease-smooth",
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}>
                <CardContent className="p-0">
                    <div className="divide-y divide-neutral-100">
                        {instructions.map((instruction, index) => (
                            <div key={index} className="flex gap-4 p-4 hover:bg-neutral-50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-mint-500 text-white flex items-center justify-center text-body-sm font-semibold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-body text-neutral-900 leading-relaxed pt-1">
                                    {instruction}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

// Comments Section Component
function CommentsSection({ comments }: { comments: any[] }) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card variant="outlined" className="overflow-hidden">
            <CardHeader 
                className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <CardTitle className="text-h3 text-neutral-900">תגובות</CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-caption text-neutral-600">
                            {comments?.length || 0} תגובות
                        </span>
                        {isOpen ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                    </div>
                </div>
            </CardHeader>

            <div className={cn(
                "transition-all duration-300 ease-smooth",
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}>
                <CardContent>
                    {comments && comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="border-b border-neutral-100 pb-4 last:border-b-0">
                                    {/* Comment content would go here */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-body text-neutral-600 mb-4">
                                עדיין אין תגובות על המתכון הזה
                            </p>
                            <Button variant="outline">
                                <RiAddLine size={16} />
                                הוסף תגובה ראשונה
                            </Button>
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    )
}

// Kitchen Toolbox Component
function KitchenToolbox({ isOpen, onClose, recipe }: {
    isOpen: boolean, 
    onClose: () => void, 
    recipe: Recipe
}) {
    const workerRef = React.useRef<Worker>()
    const [timerMinutes, setTimerMinutes] = React.useState(15)
    const [isTimerRunning, setIsTimerRunning] = React.useState(false)

    React.useEffect(() => {
        if (!window.Worker) return
        workerRef.current = new Worker("/clock-worker.js", {type: "module"})
        
        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    const startTimer = () => {
        workerRef.current?.postMessage({type: "start", ms: timerMinutes * 60 * 1000})
        setIsTimerRunning(true)
    }

    const stopTimer = () => {
        workerRef.current?.postMessage({type: "stop"})
        setIsTimerRunning(false)
    }

    const resetTimer = () => {
        workerRef.current?.postMessage({type: "reset"})
        setIsTimerRunning(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <Card 
                variant="elevated" 
                className="relative w-full max-w-md animate-scale-in"
            >
                <CardHeader className="bg-gradient-to-r from-brown-400 to-blue-mint-400 text-white">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-white">ארגז כלי המטבח</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-white hover:bg-white/20"
                            onClick={onClose}
                        >
                            <RiCloseLine size={20} />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Timer Section */}
                    <div className="space-y-4">
                        <h3 className="text-h4 font-semibold text-neutral-900">טיימר בישול</h3>
                        
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={timerMinutes}
                                onChange={(e) => setTimerMinutes(Number(e.target.value))}
                                className="flex-1"
                                min="1"
                                max="180"
                            />
                            <span className="text-body text-neutral-600">דקות</span>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={isTimerRunning ? "secondary" : "primary"}
                                size="sm"
                                onClick={isTimerRunning ? stopTimer : startTimer}
                                className="flex-1"
                            >
                                {isTimerRunning ? (
                                    <>
                                        <RiPauseLine size={16} />
                                        עצור
                                    </>
                                ) : (
                                    <>
                                        <RiPlayLine size={16} />
                                        התחל
                                    </>
                                )}
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetTimer}
                            >
                                <RiRefreshLine size={16} />
                                איפוס
                            </Button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="text-h4 font-semibold text-neutral-900">פעולות מהירות</h3>
                        
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                                טיימר 5 דק׳
                            </Button>
                            <Button variant="outline" size="sm">
                                טיימר 10 דק׳
                            </Button>
                            <Button variant="outline" size="sm">
                                טיימר 15 דק׳
                            </Button>
                            <Button variant="outline" size="sm">
                                טיימר 30 דק׳
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

Page.getLayout = (page) => (
    <Layout isHome={false} bnb={<></>}>
        {page}
    </Layout>
)

export default Page;

function demoIngredients(): Ingredient[] {
    return [
        {
            id: "1",
            name: "קמח לבן",
            amount: "2",
            unit: "כוסות",
            required: true
        },
        {
            id: "2",
            name: "סוכר לבן",
            amount: "1",
            unit: "כוס",
            required: true
        },
        {
            id: "3",
            name: "ביצים",
            amount: "2",
            unit: "יחידות",
            required: true
        },
        {
            id: "4",
            name: "חלב",
            amount: "1",
            unit: "כוס",
            required: true
        },
        {
            id: "5",
            name: "חמאה",
            amount: "100",
            unit: "גרם",
            required: true
        },
        {
            id: "6",
            name: "תמצית וניל",
            amount: "1",
            unit: "כפית",
            required: true
        },
        {
            id: "7",
            name: "אבקת אפייה",
            amount: "1",
            unit: "כפית",
            required: true
        },
        {
            id: "8",
            name: "מלח",
            amount: "1/2",
            unit: "כפית",
            required: false
        },
    ]
}
