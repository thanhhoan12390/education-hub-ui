import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Popover from '../Popover/';
import StarRating from '../StarRating';
import WishlistButton from '~/components/features/wishlist/WishlistButton';
import type { Course } from '~/types';
import Badge from '../Badge';
import AddToCartButton from '~/components/features/cart/AddToCartButton';
import styles from './CourseCard.module.scss';

const cx = classNames.bind(styles);

interface CourseCardProps {
    course: Course;
}

function CourseCard({ course }: CourseCardProps) {
    const [open, setOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div className={cx('wrapper')} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Link target="_blank" href={`/view-course/${course.courseId}`}>
                <div ref={cardRef} className={cx('course-card-wrapper')}>
                    <div className={cx('course-img')}>
                        <Image src={course.imageUrl} width={480} height={270} priority alt="course image" />
                    </div>
                    <div className={cx('course-content')}>
                        <h3 className={cx('course-heading')}>{course.title}</h3>
                        <div className={cx('course-instructor')}>{course.instructor}</div>
                        <div className={cx('course-rating')}>
                            <span className={cx('rating-number')}>{course.rating.toFixed(1)}</span>
                            <StarRating rating={course.rating} />
                            <span className={cx('rating-count')}>({course.ratingCount})</span>
                        </div>
                        <div className={cx('course-price')}>
                            <span>đ</span>
                            {`${course.price.toLocaleString('en-US')}`}
                        </div>
                        <div className={cx('card-badge')}>{course.bestSeller && <Badge />}</div>
                    </div>
                </div>
            </Link>

            {open && (
                <Popover targetRef={cardRef}>
                    <div className={cx('popover-content')}>
                        <Link
                            target="_blank"
                            href={`/view-course/${course.courseId}`}
                            className={cx('popover-heading')}
                        >
                            {course.title}
                        </Link>

                        <div className={cx('popover-badge')}>
                            {course.bestSeller && <Badge />}
                            <span className={cx('popover-date')}>
                                Updated<span>August 2025</span>
                            </span>
                        </div>

                        <div className={cx('popover-stats')}>
                            <span>56.5 total hours</span>
                            <span>All Levels</span>
                            <span>Subtitles</span>
                        </div>

                        <div className={cx('popover-detail')}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia unde autem
                            debitis ab nulla iusto doloribus voluptas, a fugiat.
                        </div>

                        <ul className={cx('popover-benefits')}>
                            <li className={cx('popover-benefit-item')}>
                                <FontAwesomeIcon className={cx('popover-benefit-icon')} icon={faCheck} />
                                <div className={cx('popover-benefit-text')}>
                                    You will master the programming language by building 100 unique projects over 100
                                    days.
                                </div>
                            </li>
                            <li className={cx('popover-benefit-item')}>
                                <FontAwesomeIcon className={cx('popover-benefit-icon')} icon={faCheck} />
                                <div className={cx('popover-benefit-text')}>
                                    You will learn automation, game, app and web development, data science and machine
                                    learning all.
                                </div>
                            </li>
                            <li className={cx('popover-benefit-item')}>
                                <FontAwesomeIcon className={cx('popover-benefit-icon')} icon={faCheck} />
                                <div className={cx('popover-benefit-text')}>
                                    You will be able to program in JS professionally
                                </div>
                            </li>
                        </ul>

                        <div className={cx('popover-buttons')}>
                            <AddToCartButton courseId={course.courseId} />
                            <WishlistButton courseId={course.courseId} />
                        </div>
                    </div>
                </Popover>
            )}
        </div>
    );
}

export default CourseCard;
