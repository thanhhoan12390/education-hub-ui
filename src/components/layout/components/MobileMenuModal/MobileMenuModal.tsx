'use client';

import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { MenuIcon } from '~/components/ui/Icons';
import MobileMultiSubMenu from '~/components/ui/MobileMultiSubMenu';
import OverlayModal from '~/components/ui/OverlayModal';
import { exploreMenuData } from '~/components/layout/components/Header/Header';
import styles from './MobileMenuModal.module.scss';

const cx = classNames.bind(styles);

function MobileMenuModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <div className={cx('mobile-menu')} onClick={() => setIsOpen(true)}>
                <MenuIcon width="2.8rem" height="2.8rem" />
            </div>

            <OverlayModal open={isOpen} onClose={() => setIsOpen(false)}>
                {null}
            </OverlayModal>
            <div
                className={cx('menu-wrapper', {
                    ['menu-open']: isOpen,
                })}
            >
                <MobileMultiSubMenu menuFieldData={exploreMenuData} open={isOpen} onClose={() => setIsOpen(false)} />
                <div
                    className={cx('menu-close-btn', {
                        ['menu-close-btn-visible']: isOpen,
                    })}
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon fontSize="1.4rem" icon={faXmark} />
                </div>
            </div>
        </Fragment>
    );
}

export default MobileMenuModal;
