import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { ImHeart } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ViewBookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState();
    const role = useSelector((state) => state.auth.role);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    }, []);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",
            {},
            {headers}
        );
        alert(response.data.message);
    }; 
    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",
            {},
            {headers}
        );
        alert(response.data.message);
      
    }; 
    const deleteBook = async () => {
        const response = await axios.delete("http://localhost:1000/api/v1/delete-book",{headers});
        alert(response.data.message);
        navigate("/all-books");
    };
    return (
        <>
            {Data && (
                <div className="px-4 md:px-12 py-8 bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/6 ">
                        {" "}
                        <div className="flex flex-col lg:flex-row justify-around  bg-gradient-to-tl from-zinc-800 to-zinc-900 rounded p-12 ">
                            <img src={Data.url} alt="/" className="h-[50vh] lg:h-[70vh] md:h-[60vh] rounded" />
                            {isLoggedIn === true && role === "user" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start gap-4 mt-4 lg:mt-0">
                                    <button className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 rounded lg:rounded-full text-2xl p-3 text-white flex items-center justify-center shadow-lg" onClick={handleFavourite}>
                                    <ImHeart /> <span className="ms-4 block lg:hidden">Favourites</span>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 rounded lg:rounded-full text-2xl p-3 text-white flex items-center justify-center shadow-lg"  onClick={handleCart}>
                                        <FaShoppingCart /> <span className="ms-4 block lg:hidden">Add to cart</span>
                                    </button>
                                </div>
                            )}

                            {isLoggedIn === true && role === "admin" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start gap-4 mt-4 lg:mt-0">
                                    <Link 
                                    to={`/updateBook/${id}`} className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 rounded lg:rounded-full text-2xl p-3 flex items-center justify-center text-white shadow-lg">
                                        <FaEdit /> <span className="ms-4 block lg:hidden">Edit</span>
                                    </Link>
                                    <button className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 rounded lg:rounded-full text-2xl p-3 text-white flex items-center justify-center shadow-lg"
                                    onClick={deleteBook}>
                                        <MdDelete /> <span className="ms-4 block lg:hidden">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                        <p className="text-zinc-400 mt-1">by {Data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" /> {Data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: Tk {Data.price}{" "}
                        </p>
                    </div>
                </div>)}
            {!Data && (<div className="h-screen bg-zinc-900 flex items-center justify-center">
                <Loader /> {" "}
            </div>)}
        </>
    )
}

export default ViewBookDetails
