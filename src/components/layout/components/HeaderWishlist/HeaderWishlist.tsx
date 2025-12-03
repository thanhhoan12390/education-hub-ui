'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { use, Fragment, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import HeaderWishlistItem from '~/components/features/wishlist/HeaderWishlistItem';
import { Course } from '~/types';
import styles from './HeaderWishlist.module.scss';

const cx = classNames.bind(styles);

interface HeaderWishlistProps {
    wishlistPromise: Promise<Course[]>;
    className?: string;
}

function HeaderWishlist({ wishlistPromise, className }: HeaderWishlistProps) {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    const wishlistData = use(wishlistPromise);

    useEffect(() => {
        setOpen(false);
    }, [pathName]);

    return (
        <div
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={cx('nav-item', className)}
        >
            <Link className={cx('nav-link')} href="/wishlist">
                <FontAwesomeIcon icon={faHeart} className={cx('nav-icon')} />
            </Link>

            {open && (
                <PopperWrapper className={cx('nav-wishlist-wrapper')}>
                    <div className={cx('wishlist-container')}>
                        {wishlistData.length > 0 ? (
                            <Fragment>
                                <div className={cx('wishlist-content')}>
                                    {wishlistData.map((course) => (
                                        <HeaderWishlistItem key={course.courseId} wishlistItemData={course} />
                                    ))}
                                </div>

                                <div className={cx('wishlist-button')}>
                                    <FlexibleButton href="/wishlist" primary>
                                        Go to wishlist
                                    </FlexibleButton>
                                </div>
                            </Fragment>
                        ) : (
                            <div className={cx('no-wishlist-content')}>
                                <div className={cx('nav-wishlist-text')}>Your wishlist is empty.</div>
                                <FlexibleButton href="/" text>
                                    Explore courses
                                </FlexibleButton>
                            </div>
                        )}
                    </div>
                </PopperWrapper>
            )}
        </div>
    );
}

export default HeaderWishlist;
