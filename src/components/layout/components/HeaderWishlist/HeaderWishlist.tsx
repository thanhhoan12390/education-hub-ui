import classNames from 'classnames/bind';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { use, Fragment } from 'react';

import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import styles from './HeaderWishlist.module.scss';
import HeaderWishlistItem from '~/components/features/wishlist/HeaderWishlistItem';
import { Course } from '~/types';

const cx = classNames.bind(styles);

interface HeaderWishlistProps {
    wishlistPromise: Promise<Course[]>;
    className?: string;
}

function HeaderWishlist({ wishlistPromise, className }: HeaderWishlistProps) {
    const wishlistData = use(wishlistPromise);

    return (
        <div className={cx('nav-item', className)}>
            <Link className={cx('nav-link')} href="">
                <FontAwesomeIcon icon={faHeart} className={cx('nav-icon')} />
            </Link>

            <PopperWrapper className={cx('nav-wishlist-wrapper')}>
                <div className={cx('wishlist-container')}>
                    {wishlistData.length > 0 ? (
                        <Fragment>
                            <div className={cx('wishlist-content')}>
                                {wishlistData.map((item) => (
                                    <HeaderWishlistItem key={item.courseId} wishlistItemData={item} />
                                ))}
                            </div>

                            <div className={cx('wishlist-button')}>
                                <FlexibleButton href="" primary>
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
        </div>
    );
}

export default HeaderWishlist;
