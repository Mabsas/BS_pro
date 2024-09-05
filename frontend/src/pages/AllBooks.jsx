import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                // Retrieve the token from localStorage (or wherever it's stored)
                const token = localStorage.getItem('token');

                // If token doesn't exist, throw an error
                if (!token) {
                    throw new Error('No token found');
                }

                // Make the API call with the token in the Authorization header
                const response = await axios.get("http://localhost:1000/api/v1/get-all-books", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                // Handle the error as needed (e.g., show an error message)
            }
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 h-auto px-12 py-8">
            <h4 className="text-3xl text-yellow-100">All Books</h4>
            {!Data && (
                <div className="flex items justify-center my-8">
                    <Loader />
                </div>
            )}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {Data &&
                    Data.map((items, i) => (
                        <div 
                            key={i} 
                            className="transform hover:scale-105 transition-transform duration-300"
                        >
                            <BookCard data={items} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllBooks;
