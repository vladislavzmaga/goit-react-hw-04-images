import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  SearchbarButton,
  SearchbarButtonText,
  SearchbarForm,
  SearchbarHeader,
  SearchbarInput,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  const getInputValue = evt => {
    setValue(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onSubmit(value, page);
    reset();
  };

  const reset = () => {
    setValue('');
    setPage(1);
  };

  return (
    <SearchbarHeader>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchbarButton type="submit">
          <SearchbarButtonText>Search</SearchbarButtonText>
        </SearchbarButton>

        <SearchbarInput
          type="text"
          name="name"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={getInputValue}
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
