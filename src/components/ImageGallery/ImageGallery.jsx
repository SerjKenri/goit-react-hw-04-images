import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { fetchImagesApi } from 'api/api';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';


export function ImageGallery({ request }) {
    const [searchParams, setSearchParams] = useState('');
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState('idle');

    const resetRequest = () => {
        setGallery([]);
        setPage(1);
        setTotalHits(0);
        setError(null);
        setLoader(false);
        setStatus('idle')
    };

    const handleButtonClick = () => {
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        resetRequest();
        setSearchParams(request)
    },[request]);


    useEffect(() => {
        if(!searchParams) {
            return;
        }

        setLoader(true);
            fetchImagesApi(searchParams, page)
                .then(response => {
                    const {hits, totalHits} = response;
                    if(!hits.length) {
                        toast.warning(`Запрос ${searchParams} не найден.`);
                        return;
                    }
                    const newImages = hits.map(
                        ({ id, tags, webformatURL, largeImageURL}) => ({
                            id,
                            tags,
                            webformatURL,
                            largeImageURL,
                        })
                    );
                    setGallery(prev => [...prev, ...newImages]);
                    setTotalHits(totalHits);
                    setStatus('resolved');
                })
                .catch(error => {
                    setError(error);
                    setStatus('rejected');
                    resetRequest();
                })
                .finally (() => setLoader(false))
    },[searchParams, page])
    

        if(!gallery.length && !loader) {
            return <h2>Введите запрос для поиска</h2>
        }

        if(status === 'rejected') {
            return toast.error(`${error.message}`)
        };

        if(status === 'resolved') {
            return <>
            <ul className={css.ImageGallery}>
            {gallery.map(({ id, webformatURL,largeImageURL, tags }) => (
            <ImageGalleryItem
            key={id}
            id={id}
            images={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
            />
            ))}
            </ul>
            {loader && <Loader />}
            {!loader && gallery.length < totalHits && <Button onClick={handleButtonClick}/>}
        </>
        }
    }

    ImageGallery.propTypes = {
        request: propTypes.string.isRequired,
    };