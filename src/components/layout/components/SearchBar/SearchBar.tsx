'use client';

import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';

import SearchItem from '../SearchItem';
import SearchAutoComplete from '../SearchAutoComplete';
import useDebounce from '~/hooks/useDebounce';
import type { ListPokemon } from '~/types';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    const debouncedValue = useDebounce(searchValue, 500);

    const baseURl = 'https://pokeapi.co/api/v2/pokemon';

    const { data, error, isLoading } = useSWR<ListPokemon>([baseURl, { limit: 1000, offset: 0 }], {
        revalidateOnFocus: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const filteredList = useMemo(
        () =>
            debouncedValue !== '' && data
                ? data.results.filter((item) => item.name.startsWith(debouncedValue.toLowerCase()))
                : [],
        [debouncedValue, data],
    );

    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Co loi xay ra....</div>;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input
                    value={searchValue}
                    placeholder="Search for anything"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => {}}
                    className={cx('search-input')}
                    name="search input"
                />

                <button
                    className={cx('search-btn')}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    disabled={searchValue === ''}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-btn-icon')} />
                </button>
            </div>

            {filteredList.length > 0 && (
                <div className={cx('search-result')} tabIndex={-1}>
                    {filteredList.slice(0, 5).map((data, index) => (
                        <SearchAutoComplete key={index} searchText={data.name} />
                    ))}

                    {filteredList.slice(0, 7).map((data, index) => (
                        <SearchItem key={index} searchItemURL={data.url} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
