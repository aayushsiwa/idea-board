function toggleTheme() {
    if (typeof document !== "undefined") {
        const root = document.documentElement;
        const currentTheme = root.getAttribute("data-theme");

        if (currentTheme === "dark") {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    }
}

// Apply saved theme on page load
if (typeof document !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        document.documentElement.setAttribute("data-theme", storedTheme);
    }
}

export default toggleTheme;
