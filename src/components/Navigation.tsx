import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='flex justify-between items-center h-[50px] px-5 bg-gray-500 text-white'>
      <h3 className='font-bold'>GitHub Search</h3>
      <span className='flex gap-2'>
        <Link to={'/'}>Home</Link>
        <Link to={'/favourites'}>Favourites</Link>
      </span>
    </div>
  );
};

export default Navigation;
