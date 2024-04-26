
export default function MainPageLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-w-full min-h-full p-0 m-0 overflow-y-hidden">
            {children}
        </div>
    )
}