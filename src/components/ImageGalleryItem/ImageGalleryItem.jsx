import { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import Modal from 'components/Modal/Modal.jsx';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({id, images, largeImage, tags}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleToggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // }
    const handleToggleModal = useCallback(() => {
        setIsModalOpen(!isModalOpen);
    }, [isModalOpen]);

    
    return (
        <li className={css.ImageGalleryItem} key={id} onClick={handleToggleModal}>
            <img className={css.ImageGalleryItemImage} src={images} alt={tags} key={id}/>
            {isModalOpen && (<Modal src={largeImage} alt={tags} onClose={handleToggleModal}/>)}
        </li>
)}

ImageGalleryItem.propTypes = {
        images: propTypes.string.isRequired,
        largeImage: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
        tags: propTypes.string.isRequired,
    };

export default ImageGalleryItem;