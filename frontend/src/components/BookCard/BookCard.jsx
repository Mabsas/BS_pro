import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        {headers}
    );
    alert(response.data.message);
}; 
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[30vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-200 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">Tk {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition duration-300 ease-in-out transform hover:scale-105 rounded-md text-xl p-4  flex items-center justify-center text-white shadow-lg shadow-gray-600/50"
          onClick={handleRemoveBook}
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard
