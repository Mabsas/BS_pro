import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const SearchResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query'); // Extract search query from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://bs-pro-api.vercel.app/api/v1/search-books`, {
          params: { query }
        });
        setData(response.data.data); // Set the fetched data
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 md:p-12 bg-gradient-to-br from-slate-900 via-gray-600 to-zinc-800 min-h-screen">
      <h4 className="text-5xl font-bold text-yellow-100 text-center mb-10">Search Results</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <div key={i} className="transform hover:scale-105 transition-transform duration-300 p-4">
              <BookCard data={item} /> {/* Pass each book item to BookCard */}
            </div>
          ))
        ) : (
          <p className="text-center text-yellow-100">No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
