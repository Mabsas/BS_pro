import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


const UpdateBook = () => {

    
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };


    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ) {
                alert("All fields are required!");
            } else {
                const response = await axios.put("https://bs-pro-api.vercel.app/api/v1/update-book",
                    Data,
                    { headers }
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                });
                alert(response.data.message);
                navigate(`/view-book-details/${id}`)
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`https://bs-pro-api.vercel.app/api/v1/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 h-[100%] p-4">
            <h1 className="text-5xl font-semibold text-zinc-400 mb-8">
                Update Book
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                {/* Image URL */}
                <div>
                    <label htmlFor="url" className="text-zinc-400 block mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter the URL of the book's image"
                        name="url"
                        required
                        value={Data.url}
                        onChange={change}
                    />
                </div>

                {/* Book Title */}
                <div className="mt-6">
                    <label htmlFor="title" className="text-zinc-400 block mb-2">
                        Book Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter the book's title"
                        name="title"
                        required
                        value={Data.title}
                        onChange={change}
                    />
                </div>

                {/* Author */}
                <div className="mt-6">
                    <label htmlFor="author" className="text-zinc-400 block mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter the author's name"
                        name="author"
                        required
                        value={Data.author}
                        onChange={change}
                    />
                </div>

                {/* Language and Price */}
                <div className="mt-6 flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="language" className="text-zinc-400 block mb-2">
                            Language
                        </label>
                        <input
                            type="text"
                            id="language"
                            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Language of the book"
                            name="language"
                            required
                            value={Data.language}
                            onChange={change}
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="price" className="text-zinc-400 block mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Price of the book"
                            name="price"
                            required
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label htmlFor="desc" className="text-zinc-400 block mb-2">
                        Description
                    </label>
                    <textarea
                        id="desc"
                        className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        rows="5"
                        placeholder="Brief description of the book"
                        name="desc"
                        required
                        value={Data.desc}
                        onChange={change}
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
                    onClick={submit}
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default UpdateBook
