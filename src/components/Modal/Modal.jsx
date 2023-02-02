import { useEffect, useCallback } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

function Modal({ src, alt, onClose }) {
    const modelKeyClose = useCallback(handleKeydownClose, [handleKeydownClose]);

    useEffect(() => {
        window.addEventListener('keydown', modelKeyClose);
        return () => {
            window.removeEventListener('keydown', modelKeyClose);
        };
    }, [modelKeyClose]);

    function handleKeydownClose(event) {
        if (event.code === 'Escape') {
            onClose();
        }
    }

    function handleOverlayClose(event) {
        if (event.currentTarget === event.target) {
            return onClose();
        }
    }

    return (
        <div className={css.Overlay} onClick={handleOverlayClose}>
            <div className={css.Model}>
                <img src={src} alt={alt} />
            </div>
        </div>
    );
}

Modal.propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
};

export default Modal;
