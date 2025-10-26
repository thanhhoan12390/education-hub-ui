import classNames from 'classnames/bind';
import Link from 'next/link';
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchAutoComplete.module.scss';

const cx = classNames.bind(styles);

interface SearchAutoCompleteProps {
    searchText: string;
}

function SearchAutoComplete({ searchText }: SearchAutoCompleteProps) {
    return (
        <div className={cx('wrapper')}>
            <Link href="" className={cx('container')}>
                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className={cx('search-content')}>
                    <div className={cx('content-title')}>{searchText}</div>
                </div>
            </Link>
        </div>
    );
}

export default memo(SearchAutoComplete);
