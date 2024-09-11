import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {role === "user" && (
                <div className="py-4 flex flex-row items-center">
                    <Link
                        to="/profile"
                        className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
                    >
                        Favourites
                    </Link>
                    <Link
                        to="/profile/orderHistory"
                        className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
                    >
                        Order History
                    </Link>
                    <Link
                        to="/profile/settings"
                        className="text-gray-100 font-semibold w-full lg:hidden  py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
                    >
                        Settings
                    </Link>
                </div>
            )}
            {role === "admin" && (
                <div className="py-4 flex flex-row items-center">
                    <Link
                        to="/profile"
                        className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
                    >
                        All Orders
                    </Link>
                    <Link
                        to="/profile/add-book"
                        className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
                    >
                        Add Book
                    </Link>
                </div>
            )}
        </>
    );
};

export default MobileNav;
