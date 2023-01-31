import { useState } from 'react';
import propTypes from 'prop-types';
import { Model } from 'components/Model/Model.jsx';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({id, images, largeImage, tags}) {
    const [isModelOpen, setIsModelOpen] = useState(false);


    return (
        <li className={css.ImageGalleryItem} key={id} onClick={() => setIsModelOpen(true)}>
            <img className={css.ImageGalleryItemImage} src={images} alt={tags} key={id}/>
            {isModelOpen && (<Model src={largeImage} alt={tags} onClose={() => setIsModelOpen(false)}/>)}
        </li>
)}

ImageGalleryItem.propTypes = {
        images: propTypes.string.isRequired,
        largeImage: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
        tags: propTypes.string.isRequired,
    };