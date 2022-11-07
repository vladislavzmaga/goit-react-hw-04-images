import React, { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = (value, page) => {
    setPage(page);
    setValue(value);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery value={value} page={page} />
    </div>
  );
};
