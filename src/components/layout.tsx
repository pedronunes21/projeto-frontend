import Header from "./header"

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <Header />
            <div className="pt-[60px] px-[20px]">
                {children}

            </div>
        </div>
    )
}

export default Layout