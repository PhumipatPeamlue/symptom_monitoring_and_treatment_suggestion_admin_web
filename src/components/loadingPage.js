import LoadingBtn from "./loadingBtn";

export default function LoadingPage() {
    return (
        <div className="container mx-auto">
                <div className="flex flex-col justify-center h-screen">
                    <div className="mt-5">
                        <div className="flex justify-center">
                            <LoadingBtn />
                        </div>
                    </div>
                </div>
            </div>
    )
}