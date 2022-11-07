import PropTypes from 'prop-types';
import { fetchImages } from 'components/API/API';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import React, { useState, useEffect } from 'react';
import {
  StartTitle,
  SecondTitle,
  GalleryList,
  ToStartBtn,
} from './ImageGallery.styled';

export const ImageGallery = ({ value, page }) => {
  const [data, setData] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [request, setRequest] = useState('');
  const perPage = 12;

  const addMore = () => {
    setNewPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    setData([]);
    setNewPage(1);
    setStatus('pending');
    setRequest(value);

    fetchImages(value, page, perPage).then(result => {
      const respounse = result.data.hits;
      if (respounse.length === 0) {
        setStatus('rejected');
        return;
      }
      setData(respounse);
      setStatus('resolved');
    });
  }, [value, page]);

  useEffect(() => {
    if (newPage !== 1) {
      fetchImages(request, newPage, perPage).then(result => {
        const data = result.data.hits;
        setData(prevState => [...prevState, ...data]);
      });
    }
  }, [newPage, request]);

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <SecondTitle>Nothing found for your request!!!</SecondTitle>;
  }
  if (status === 'resolved') {
    return (
      <div id="toup">
        <GalleryList>
          {data.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </GalleryList>

        {data.length >= perPage && <Button loadMore={addMore} />}
        {data.length > perPage && (
          <ToStartBtn href="#toup" type="button">
            to start
          </ToStartBtn>
        )}
      </div>
    );
  }
  if (status === 'idle') {
    return <StartTitle>Enter the name of the picture or photo!!!</StartTitle>;
  }
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
