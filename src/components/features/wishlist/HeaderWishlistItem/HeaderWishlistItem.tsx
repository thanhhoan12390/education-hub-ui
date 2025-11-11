import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import { Course } from '~/types';
import AddToCartButton from '~/components/features/cart/AddToCartButton';
import styles from './HeaderWishlistItem.module.scss';

const cx = classNames.bind(styles);

interface HeaderWishlistItemProps {
    className?: string;
    wishlistItemData: Course;
}

function HeaderWishlistItem({ className, wishlistItemData }: HeaderWishlistItemProps) {
    return (
        <div className={cx('wrapper', className)}>
            <Link href={`/view-course/${wishlistItemData.courseId}`} className={cx('description-wrapper')}>
                <div className={cx('image-wrapper')}>
                    <Image src={wishlistItemData.imageUrl} alt="wishlist item" width={64} height={64} />
                </div>

                <div className={cx('item-des')}>
                    <div className={cx('item-title')}>{wishlistItemData.title}</div>
                    <div className={cx('item-instructor')}>{wishlistItemData.instructor}</div>
                    <div className={cx('item-price')}>
                        <span>đ</span>
                        {`${wishlistItemData.price.toLocaleString('en-US')}`}
                    </div>
                </div>
            </Link>

            <div className={cx('add-cart')}>
                <AddToCartButton medium noPrimary courseId={wishlistItemData.courseId} />
            </div>
        </div>
    );
}

export default HeaderWishlistItem;
