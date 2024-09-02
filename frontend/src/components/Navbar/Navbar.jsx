import React from 'react'

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
    ];
    return (
        <div className="flex bg-zinc-800 text-white px-8 py-4  items-center justify-between">
            <div className="flex items-center">
                <img
                    className="h-10 me-4"
                    src="https://cdn-icons-png.flaticon.com/512/10719/10719415.png"
                    alt="logo"
                />
                <h1 className="text-2xl font-semibold">BoOkshelf</h1>
            </div>
            <div className="nav-links-bookshelf flex items-center gap-4">
                <div className="flex gap-4">
                {links.map((items, i) => (
                    <div
                    className="hover:text-blue-500 transition-all duration-300" 
                    key={i}
                    >
                        {items.title}{" "}
                        </div>
                ))}
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                        LogIn
                        </button>
                    <button className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                        SignUp
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;