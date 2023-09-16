import Cookies from "js-cookie";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-screen h-[58px] bg-[rgba(255,255,255,.2)] border-b  px-[20px] md:px-[50px] flex items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-[1280px]">
                <a href="/treinos">
                    <h1 className="text-orange text-[34px]">PUMPI</h1>
                </a>
                <div className="flex items-center gap-[30px]">
                    {!!Cookies.get("token") ?
                        <>
                            <a className="text-orange font-semibold" href="/treinos">Treinos</a>
                            <a className="text-orange font-semibold" href="/aulas">Aulas</a>
                            <a className="text-orange font-semibold" href="/perfil">Perfil</a>
                        </> :
                        <>
                            <a className="text-orange font-semibold" href="/entrar">Entrar</a>
                            <a className="text-orange font-semibold" href="/registro">Registrar</a>
                        </>}
                </div>
            </div>
        </header>
    )
}

export default Header;