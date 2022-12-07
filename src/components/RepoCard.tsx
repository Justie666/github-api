import React, { MouseEvent, useState } from 'react';
import { IRepo } from '../models/models';
import { addFavourite, removeFavourite } from '../store/github/github.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { favourites } = useSelector((state: RootState) => state.github);
  const [isFav, setIsFav] = useState(favourites.includes(repo.url));
  const dispatch = useDispatch();
  const addToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addFavourite(repo.url));
    setIsFav(true);
  };
  const removeFromFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeFavourite(repo.url));
    setIsFav(false);
  };

  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm'>
          Forks: <span className='font-bold mr-2'>{repo.forks}</span>
          Watchers: <span className='font-bold'>{repo.watchers}</span>
        </p>
        <p className='text-sm font-thin'>{repo?.description}</p>

        {!isFav && (
          <button
            className='py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all'
            onClick={addToFavourite}>
            Add
          </button>
        )}

        {isFav && (
          <button
            className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
            onClick={removeFromFavourite}>
            Removes
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
