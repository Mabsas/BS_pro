import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
    const [Data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                // Make the API call without authentication headers
                const response = await axios.get("http://localhost:1000/api/v1/get-all-books");

                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) {
        return (
            <div className="flex items justify-center my-8">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 my-8">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 h-auto px-12 py-8">
            <h4 className="text-3xl text-yellow-100">All Books</h4>
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {Data &&
                    Data.map((item, i) => (
                        <div 
                            key={i} 
                            className="transform hover:scale-105 transition-transform duration-300"
                        >
                            <BookCard data={item} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllBooks;
