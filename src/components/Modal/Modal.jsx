import { useEffect } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

function Modal ({src, alt, onClose}) {

    useEffect(() => {
        const handleKeydownClose = e => {
            if (e.code === 'Escape') {
            onClose();
        }
    };
    window.addEventListener('keydown', handleKeydownClose);
    return () => {
        window.removeEventListener('keydown', handleKeydownClose);
    };
    },[onClose]);

    const handleOverlayClose = event => {
        if (event.target === event.currentTarget) {
            onClose()
        };
    };

        return (
        <div className={css.Overlay} onClick={handleOverlayClose}>
            <div className={css.Model}>
                <img src={src} alt={alt} />
            </div>
        </div>
)};

Modal.propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
}

export default Modal;