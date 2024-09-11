export function LoadingSpinner() {
    return (
        <div className={"flex justify-center items-center"}>
            <div className={"animate-spin rounded-full h-6 w-6 border-t-2 border-r-2 border-blue-mint-dark"}/>
        </div>
    );
}
