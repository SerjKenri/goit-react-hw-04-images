import { useState } from 'react';
import propTypes from 'prop-types';
import Model from 'components/Model/Model.jsx';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({id, images, largeImage, tags}) {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleToggleModel = () => {
        setIsModelOpen(!isModelOpen);
    }

    
    return (
        <li className={css.ImageGalleryItem} key={id} onClick={handleToggleModel}>
            <img className={css.ImageGalleryItemImage} src={images} alt={tags} key={id}/>
            {isModelOpen && (<Model src={largeImage} alt={tags} onClose={handleToggleModel}/>)}
        </li>
)}

ImageGalleryItem.propTypes = {
        images: propTypes.string.isRequired,
        largeImage: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
        tags: propTypes.string.isRequired,
    };

export default ImageGalleryItem;