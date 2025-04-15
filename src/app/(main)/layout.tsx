import Navbar from "./resumes/Navbar";
export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <main>
            <Navbar/>
            {children}
        </main>
    )
}