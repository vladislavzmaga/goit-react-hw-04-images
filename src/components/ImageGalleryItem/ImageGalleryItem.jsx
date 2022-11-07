import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import React, { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <GalleryItem>
      <GalleryImage
        onClick={openModal}
        src={item.webformatURL}
        alt={item.user}
        loading="lazy"
      />
      {isModalOpen && <Modal item={item} onClose={closeModal} />}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
