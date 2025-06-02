export default function BillboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="">
            <main key="billboard-content">
                {children}
            </main>
        </div>
    )
}