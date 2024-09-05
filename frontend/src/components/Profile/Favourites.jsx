import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';

const Favourites = () => {


  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();

    return () => {

    }
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 ? (
        <div className="h-screen flex flex-col items-center justify-center w-full bg-zinc-800">
          <div className="text-5xl font-bold text-zinc-500 mb-4">
            No Favourite Books
          </div>
          <img src="./star.png" alt="star" className="h-[15vh]" />
        </div>

      ) : (
        <div className="grid grid-cols-4 gap-4">
          {FavouriteBooks && FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites
