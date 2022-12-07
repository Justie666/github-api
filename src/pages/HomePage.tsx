import React, { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounce = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 3,
    refetchOnFocus: true,
  });
  useEffect(() => {
    setDropdown(debounce.length > 3 && data?.length! > 0);
  }, [debounce, data]);
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();
  const clickHandler = (username: string) => {
    fetchRepos(username);
    setSearch('');
  };

  return (
    <div className='flex justify-center pt-10 w-screen h-screen '>
      {isError && <p className='text-center text-red-600'>Something went wrong...</p>}
      <div className='relative w-[560px]'>
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='search for GitHub username'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className='list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                key={user.id}
                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className='container'>
          {areReposLoading && <p className='text-center'>Loading...</p>}
          {repos?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
