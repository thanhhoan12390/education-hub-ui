import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import { Course } from '~/types';
import styles from './HeaderCartItem.module.scss';

const cx = classNames.bind(styles);

interface HeaderCartItemProps {
    className?: string;
    cartItemData: Course;
}

function HeaderCartItem({ className, cartItemData }: HeaderCartItemProps) {
    return (
        <Link href={`/view-course/${cartItemData.courseId}`} className={cx('wrapper', className)}>
            <div className={cx('image-wrapper')}>
                <Image src={cartItemData.imageUrl} alt="cart item" width={64} height={64} />
            </div>

            <div className={cx('item-des')}>
                <div className={cx('item-title')}>{cartItemData.title}</div>
                <div className={cx('item-instructor')}>{cartItemData.instructor}</div>
                <div className={cx('item-price')}>
                    <span>đ</span>
                    {`${cartItemData.price.toLocaleString('en-US')}`}
                </div>
            </div>
        </Link>
    );
}

export default HeaderCartItem;
