'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState } from 'react';

import OverlayModal from '~/components/ui/OverlayModal';
import SearchBar from '../SearchBar';
import styles from './MobileSearch.module.scss';

const cx = classNames.bind(styles);

function MobileSearch() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <div className={cx('mobile-search')} onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-btn-icon')} />
            </div>

            <OverlayModal open={isOpen}>
                <div className={cx('search-overlay-wrapper')}>
                    <SearchBar overlaySearch />
                    <button className={cx('search-close-btn')} onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </OverlayModal>
        </Fragment>
    );
}

export default MobileSearch;
