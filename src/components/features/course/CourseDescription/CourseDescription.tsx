import classNames from 'classnames/bind';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEarth } from '@fortawesome/free-solid-svg-icons';
import { use } from 'react';

import StarRating from '~/components/ui/StarRating';
import Badge from '~/components/ui/Badge';
import { Course } from '~/types';
import styles from './CourseDescription.module.scss';

const cx = classNames.bind(styles);

interface CourseDescriptionProps {
    course: Promise<Course>;
}

// Hàm giả lập delay
// async function fakeFetch(ms: number) {
//     await new Promise((r) => setTimeout(r, ms));
//     return { message: `Done after ${ms / 1000}s` };
// }

function CourseDescription({ course }: CourseDescriptionProps) {
    const courseData = use(course);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('intro-heading')}>{courseData.title}</h1>
            <div className={cx('intro-detail')}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, fugit corrupti magnam omnis molestiae
                ad quae assumenda consequuntur.
            </div>
            <div className={cx('tag-groups')}>
                {courseData.bestSeller && <Badge />}
                <div className={cx('intro-rate')}>{courseData.rating.toFixed(1)}</div>
                <StarRating rating={4.6} style={{ color: 'var(--dark-yellow-color)' }} />
                <div className={cx('rate-count')}>{`(${courseData.ratingCount.toLocaleString('en-US')} ratings)`}</div>

                <div className={cx('student-count')}>{`${Number(1676840).toLocaleString('en-US')} students`}</div>
            </div>
            <div className={cx('intro-instructor')}>
                Created by <Link href={''}>{courseData.instructor}</Link>
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

export default CourseDescription;
