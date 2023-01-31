import { Component } from 'react';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { fetchImagesApi } from 'Api/Api';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';


export class ImageGallery extends Component {
    static propTypes = {
        request: propTypes.string.isRequired,
    };
    
    state = {
        gallery: [],
        page: 1,
        totalHits: 0,
        error: null,
        loader: false,
        status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        const prevRequest = prevProps.request;
        const {request}= this.props;
        const { page } = this.state;
        const prevPage = prevState.page;

        if(prevRequest !== request) {
            this.setState({loader: true, page: 1, gallery: []});
            if(page === 1) {
                this.fetchImages(request, page);
            }
        }else if (prevPage !== page) {
            this.setState({loader: true});
            this.fetchImages(request, page);
        }
    };

    fetchImages = () => {
            const {request} = this.props;
            const { page } = this.state;
            this.setState({loader: true});
            fetchImagesApi(request, page)
                .then(response => {
                    const {hits, totalHits} = response;
                    if(!hits.length) {
                        toast.error(`Запрос ${request} не найден.`);
                        // this.setState({status: 'idle'})
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
                    this.setState(prevState => ({
                        gallery: [...prevState.gallery, ...newImages], totalHits, status: 'resolved'
                    }))
                })
                .catch(error => {
                    this.setState({error, status: 'rejected'});
                })
                .finally (() => this.setState({loader: false}))
    };
    

    handleButtonClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }))
    };

    handleImageClick = () => {

    }
    
    render () {
        const {gallery, status, error, totalHits, loader} = this.state;

        if(gallery.length === 0 && loader === false) {
            return <h1>Введите запрос для поиска</h1>
        }

        if(status === 'rejected') {
            return <h1>{error.message}</h1>
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
            {!loader && gallery.length < totalHits && <Button onClick={this.handleButtonClick}/>}
        </>
        }
}
};