import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FavouritesPage = () => {
  const { favourites } = useSelector((state: RootState) => state.github);

  if (favourites.length === 0) return <p className='text-center'>No items.</p>;

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      <ul className='list-none'>
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} target='_blank'>
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FavouritesPage;
