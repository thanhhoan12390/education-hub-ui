import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Popover from '../Popover/';
import StarRating from '../StarRating';
import FlexibleButton from '../FlexibleButton/FlexibleButton';
import type { Course } from '~/types';
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
            <div ref={cardRef} className={cx('course-card-wrapper')}>
                <Link href={`/view-course/${course.courseId}`}>
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
                        <div className={cx('course-price')}>{course.price}</div>
                    </div>
                </Link>
            </div>

            {open && (
                <Popover targetRef={cardRef}>
                    <div className={cx('popover-content')}>
                        <Link href="" className={cx('popover-heading')}>
                            100 Days of Code: The Complete Course Pro Bootcamp
                        </Link>

                        <div className={cx('popover-badge')}>
                            <div className={cx('popover-tag')}>Bestseller</div>
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
                            Master Python by building 100 projects in 100 days. Learn data science, automation, build
                            websites, games and apps!
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
                            <FlexibleButton primary large>
                                Add to cart
                            </FlexibleButton>
                            <div>
                                <FlexibleButton rounded large className={cx('popover-whist')}>
                                    <FontAwesomeIcon className={cx('popover-whist-icon')} icon={faHeart} />
                                </FlexibleButton>
                            </div>
                        </div>
                    </div>
                </Popover>
            )}
        </div>
    );
}

export default CourseCard;
