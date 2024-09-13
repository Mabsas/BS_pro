import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bs-pro-api.vercel.app/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto h-[550px]">
      <Link to={`/view-book-details/${data._id}`} className="flex-1">
        <div>
          <div className="flex items-center justify-center h-[300px]">
            <img
              src={data.url}
              alt={data.title}
              className="h-full object-cover rounded-lg w-full"
            />
          </div>
          <h2 className="mt-4 text-xl text-black font-semibold line-clamp-1">{data.title}</h2>
          <p className="mt-2 text-zinc-300 font-medium line-clamp-1">by {data.author}</p>
          <p className="mt-2 text-black font-semibold text-lg">Tk {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-zinc-500 hover:bg-zinc-400 transition-colors duration-300 rounded-md text-lg mt-4 p-3 text-white"
          onClick={handleRemoveBook}
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
