import classNames from 'classnames/bind';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Badge from '~/components/ui/Badge/Badge';
import StarRating from '~/components/ui/StarRating';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { Course } from '~/types';
import DeleteCartButton from '../DeleteCartButton';
import styles from './ShoppingItem.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface ShoppingItemProps {
    course: Course;
}

function ShoppingItem({ course }: ShoppingItemProps) {
    return (
        <div className={cx('shopping-item')}>
            <Link href={`view-course/${course.courseId}`}>
                <div className={cx('item-container')}>
                    <div className={cx('item-img')}>
                        <div className={cx('img-wrapper')}>
                            <Image src={course.imageUrl} alt="shopping image" width={120} height={68}></Image>
                        </div>
                    </div>
                    <div className={cx('item-header')}>
                        <h3 className={cx('item-heading')}>{course.title}</h3>
                        <div className={cx('item-instructor')}>By {course.instructor}</div>
                    </div>
                    {course.bestSeller && (
                        <div className={cx('item-badge')}>
                            <Badge />
                        </div>
                    )}
                    <div className={cx('item-rating')}>
                        <span className={cx('rating-star')}>
                            <span className={cx('rating-average')}>{course.rating.toFixed(1)}</span>
                            <StarRating rating={course.rating} />
                        </span>
                        <span className={cx('rating-count')}>
                            {`(${course.ratingCount.toLocaleString('en-US')} ratings)`}
                        </span>
                    </div>
                    <div className={cx('item-meta')}>27 sections • 165 lectures • All Levels</div>
                    <div className={cx('item-actions')}>
                        <DeleteCartButton courseId={course.courseId} />
                        <FlexibleButton light small hover className={cx('action-button')}>
                            Move to Wishlist
                        </FlexibleButton>
                    </div>
                    <div className={cx('item-price')}>
                        <div className={cx('price-wrapper')}>
                            <span>đ</span>
                            {`${course.price.toLocaleString('en-US')}`}
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '1.4rem',
                                    marginBlockStart: '0.2rem',
                                }}
                                icon={faTag}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ShoppingItem;
