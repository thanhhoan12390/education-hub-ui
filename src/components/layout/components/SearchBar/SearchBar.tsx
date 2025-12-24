'use client';

import classNames from 'classnames/bind';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Alert, Flex, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { usePathname, useSearchParams } from 'next/navigation';

import SearchItem from '../SearchItem';
import SearchAutoComplete from '../SearchAutoComplete';
import useDebounce from '~/hooks/useDebounce';
import { useGetPokemonQuery } from '~/lib/features/search/searchApiSlice';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

interface SearchBarProps {
    overlaySearch?: boolean;
    onHideSearchOverlay?: () => void;
}

function SearchBar({ overlaySearch = false, onHideSearchOverlay }: SearchBarProps) {
    const searchParams = useSearchParams();

    const q = searchParams.get('q') || '';

    const [searchValue, setSearchValue] = useState(q);
    const [isOpen, setIsOpen] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const pathName = usePathname();

    const debouncedValue = useDebounce(searchValue, 500);

    const { data, isError, isLoading } = useGetPokemonQuery(
        { limit: 1000, offset: 0 },
        {
            skip: !debouncedValue, // chỉ gọi API khi có debouncedValue
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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => setSearchValue(q), [q]);

    useEffect(() => {
        setIsOpen(false);
        onHideSearchOverlay?.();
    }, [pathName, q, onHideSearchOverlay]);

    return (
        <div
            className={cx('wrapper', {
                ['overlay-search-wrapper']: overlaySearch,
            })}
            ref={searchBarRef}
        >
            <div className={cx('search')}>
                <input
                    value={searchValue}
                    placeholder="Search for anything"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setIsOpen(true)}
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

            {filteredList.length > 0 && !isLoading && isOpen && (
                <div className={cx('search-result')} tabIndex={-1}>
                    {filteredList.slice(0, 5).map((data, index) => (
                        <SearchAutoComplete
                            key={index}
                            onSearchChange={(value) => {
                                setSearchValue(value);

                                if (q === value) {
                                    setIsOpen(false);
                                    onHideSearchOverlay?.();
                                }
                            }}
                            searchText={data.name}
                        />
                    ))}

                    {filteredList.slice(0, 7).map((data, index) => (
                        <SearchItem
                            key={index}
                            onSearchChange={(value) => {
                                setSearchValue(value);

                                if (q === value) {
                                    setIsOpen(false);
                                    onHideSearchOverlay?.();
                                }
                            }}
                            searchItemURL={data.url}
                        />
                    ))}
                </div>
            )}

            {isLoading && isOpen && (
                <div className={cx('search-result')} tabIndex={-1}>
                    <Flex align="center" gap="middle" justify="center" style={{ paddingBlock: '1rem' }}>
                        <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: '3.2rem' }} spin />} />
                    </Flex>
                </div>
            )}

            {isError && isOpen && (
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
