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
        const response = await axios.get('https://bs-pro-api.vercel.app/api/v1/get-all-books');

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-600 to-zinc-800">
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
    <div className="min-h-screen bg-gradient-to-tl from-slate-800 to-zinc-800   p-6 md:p-12">
      <h4 className="text-5xl font-bold text-yellow-100 text-center mb-10">All Books</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Data &&
          Data.map((item, i) => (
            <div 
              key={i} 
              className="transform hover:scale-105 transition-transform duration-300 p-4"
            >
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
