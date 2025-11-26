import classNames from 'classnames/bind';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEarth, faStar } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';

import StarRating from '~/components/ui/StarRating';
import Badge from '~/components/ui/Badge';
import { Course } from '~/types';
import styles from './CourseDescription.module.scss';

const cx = classNames.bind(styles);

interface CourseDescriptionProps {
    className?: string;
    course?: Course;
    lightTheme?: boolean;
}

// Hàm giả lập delay
// async function fakeFetch(ms: number) {
//     await new Promise((r) => setTimeout(r, ms));
//     return { message: `Done after ${ms / 1000}s` };
// }

function CourseDescription({ course, className, lightTheme }: CourseDescriptionProps) {
    return (
        <div className={cx('wrapper', className)}>
            <h1 className={cx('intro-heading')}>{course?.title}</h1>
            <div className={cx('intro-detail')}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, fugit corrupti magnam omnis molestiae
                ad quae assumenda consequuntur.
            </div>
            <div className={cx('tag-groups')}>
                {course?.bestSeller && <Badge />}
                <div className={cx('tag-rating-group')}>
                    <div className={cx('intro-rate')}>{course?.rating?.toFixed(1)}</div>
                    <StarRating
                        className={cx('rating-star')}
                        rating={4.6}
                        style={{ color: 'var(--dark-yellow-color)' }}
                    />
                    <FontAwesomeIcon
                        className={cx('mobile-rating-star')}
                        style={{ color: 'var(--dark-yellow-color)', fontSize: '1.2rem' }}
                        icon={faStar}
                    />
                    <div
                        className={cx('rate-count', {
                            ['light-theme']: lightTheme,
                        })}
                    >{`(${course?.ratingCount?.toLocaleString('en-US')} ratings)`}</div>

                    <div className={cx('student-count')}>{`${Number(1676840)?.toLocaleString('en-US')} students`}</div>
                </div>
            </div>
            <div className={cx('intro-instructor')}>
                Created by{' '}
                <Link href={''} className={cx({ ['light-theme']: lightTheme })}>
                    {course?.instructor}
                </Link>
            </div>
            <div className={cx('intro-date')}>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span>Last updated 10/2025</span>
                <FontAwesomeIcon icon={faEarth} />
                <span>English</span>
            </div>
        </div>
    );
}

export default memo(CourseDescription);
