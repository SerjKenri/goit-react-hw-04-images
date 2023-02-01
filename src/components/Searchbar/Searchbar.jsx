import { useState } from "react";
import propTypes from 'prop-types';
import css from './Searchbar.module.css'
import { toast } from "react-toastify";
import { BsSearch } from 'react-icons/bs'


const {SearchbarStyle, SearchForm, SearchFormButton, SearchFormInput} = css;

export function Searchbar({ onSubmit }) {

    const [request, setRequest] = useState('');

    const handleRequestChange = event => {
        const normalizedRequest = event.currentTarget.value.toLowerCase();

        setRequest(normalizedRequest);
    };

    const handleSubmin = event => {
        event.preventDefault();

        if(request.trim() === '') {
            toast.warn('Enter request');
            return
        }

        onSubmit(request);
        setRequest('');
    }

        return (
        <header className={SearchbarStyle}>
            <form className={SearchForm} onSubmit={handleSubmin}>
                <button type="submit" className={SearchFormButton}>
                    <span className="button-label"><BsSearch /></span>
                    </button>
                    <input
                    className={SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleRequestChange}
                    value={request}
                    />
            </form>
        </header>
)};

    Searchbar.propTypes = {
        onSubmit: propTypes.func.isRequired,
    }