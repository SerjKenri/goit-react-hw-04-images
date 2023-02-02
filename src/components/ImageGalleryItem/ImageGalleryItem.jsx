import { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import Modal from 'components/Modal/Modal.jsx';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, images, largeImage, tags }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalClose = useCallback(handleToggleModal, [handleToggleModal]);

    function handleToggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <li className={css.ImageGalleryItem} key={id} onClick={onModalClose}>
            <img
                className={css.ImageGalleryItemImage}
                src={images}
                alt={tags}
                key={id}
            />
            {isModalOpen && (
                <Modal src={largeImage} alt={tags} onClose={onModalClose} />
            )}
        </li>
    );
}

ImageGalleryItem.propTypes = {
    images: propTypes.string.isRequired,
    largeImage: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    tags: propTypes.string.isRequired,
};

export default ImageGalleryItem;
