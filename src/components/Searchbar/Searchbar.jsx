import { Component } from "react";
import propTypes from 'prop-types';
import css from './Searchbar.module.css'
import { toast } from "react-toastify";
import { BsSearch } from 'react-icons/bs'


const {SearchbarStyle, SearchForm, SearchFormButton, SearchFormInput} = css;

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: propTypes.func.isRequired,
    }

    state = {
        request: '',
    };

    handleRequestChange = event => {
        this.setState({ request: event.currentTarget.value.toLowerCase() });
    };

    handleSubmin = event => {
        event.preventDefault();

        if(this.state.request.trim() === '') {
            toast.warn('Enter request');
            return
        }

        this.props.onSubmit(this.state.request);
        this.setState({request: ''})
    }

    render () {
        const { request } = this.state;
        return (
        <header className={SearchbarStyle}>
            <form className={SearchForm} onSubmit={this.handleSubmin}>
                <button type="submit" className={SearchFormButton}>
                    <span className="button-label"><BsSearch /></span>
                    </button>
                    <input
                    className={SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleRequestChange}
                    value={request}
                    />
            </form>
        </header>
)}

    };
