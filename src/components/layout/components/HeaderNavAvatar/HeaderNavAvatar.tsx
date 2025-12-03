'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import PopperWrapper from '~/components/ui/PopperWrapper';
import Divider from '~/components/ui/Divider';
import styles from './HeaderNavAvatar.module.scss';

const cx = classNames.bind(styles);

function HeaderNavAvatar() {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathName]);

    return (
        <div
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={cx('nav-item', 'nav-avatar')}
        >
            <Link className={cx('nav-link')} href="">
                <div className={cx('avatar')}>HT</div>
            </Link>

            {open && (
                <PopperWrapper className={cx('nav-avatar-wrapper')}>
                    <div className={cx('nav-avatar-content')}>
                        <div className={cx('nav-avatar-header')}>
                            <div className={cx('avatar', 'popper-avatar')}>HT</div>

                            <div className={cx('avatar-name-group')}>
                                <div className={cx('avatar-name')}>Phan Thanh Hoan</div>
                                <div className={cx('avatar-email')}>hoanphantcgpocket@gmail.com</div>
                            </div>
                        </div>
                        <Divider />
                        <ul className={cx('nav-avatar-links')}>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="/my-courses">
                                    My Learning
                                </Link>
                            </li>

                            <li>
                                <Link className={cx('nav-avatar-link')} href="/cart">
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="/wishlist">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="">
                                    Notifications
                                </Link>
                            </li>
                        </ul>
                        <Divider />

                        <div className={cx('nav-avatar-language')}>
                            <div className={cx('nav-language-group')}>
                                <div className={cx('language-heading')}>Language</div>
                                <div className={cx('language-group')}>
                                    <span>English</span>
                                    <FontAwesomeIcon
                                        style={{
                                            fontSize: '1.4rem',
                                            marginInlineStart: '0.4rem',
                                        }}
                                        icon={faEarth}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </PopperWrapper>
            )}
        </div>
    );
}

export default HeaderNavAvatar;
