'use client';

import classNames from 'classnames/bind';
import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Alert, Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

    // chi goi khi co debouncedValue
    const { data, error, isLoading } = useSWR<ListPokemon>(
        debouncedValue ? [baseURl, { limit: 1000, offset: 0 }] : null,
        {
            revalidateOnFocus: false,
        },
    );

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

            {filteredList.length > 0 && !isLoading && (
                <div className={cx('search-result')} tabIndex={-1}>
                    {filteredList.slice(0, 5).map((data, index) => (
                        <SearchAutoComplete key={index} searchText={data.name} />
                    ))}

                    {filteredList.slice(0, 7).map((data, index) => (
                        <SearchItem key={index} searchItemURL={data.url} />
                    ))}
                </div>
            )}

            {isLoading && (
                <div className={cx('search-result')} tabIndex={-1}>
                    <Flex align="center" gap="middle" justify="center" style={{ paddingBlock: '1rem' }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: '3.2rem' }} spin />} />
                    </Flex>
                </div>
            )}

            {error && (
                <div className={cx('search-result')} tabIndex={-1}>
                    <Alert
                        type="error"
                        message="Somethings went wrong. Please reload and retry ..."
                        banner
                        style={{ width: '100%', borderRadius: '0.4rem' }}
                    />
                </div>
            )}
        </div>
    );
}

export default SearchBar;
