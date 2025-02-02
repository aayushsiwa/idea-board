import toggleTheme from "./toggleTheme";

function Navbar() {
    return (
        <nav className="h-16 bg-muted backdrop-blur-2xl text-primary flex items-center justify-between px-4 min-w-[33vw] max-w-fit rounded-md">
            <div className="text-xl cursor-pointer select-none">IdeaBoard</div>
            <button className="" onClick={toggleTheme}>
                Theme
            </button>
        </nav>
    );
}

export default Navbar;
