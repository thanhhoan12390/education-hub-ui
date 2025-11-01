import classNames from 'classnames/bind';
import { use } from 'react';

import StarRating from '~/components/ui/StarRating';
import Badge from '~/components/ui/Badge';
import { Course } from '~/types';
import styles from './FixedSubHeader.module.scss';

const cx = classNames.bind(styles);

interface FixedSubHeaderProps {
    course: Promise<Course>;
}

function FixedSubHeader({ course }: FixedSubHeaderProps) {
    const courseData = use(course);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sub-header-content')}>
                <h2 className={cx('sub-header-heading')}>{courseData.title}</h2>
                <div className={cx('tag-groups')}>
                    {courseData.bestSeller && <Badge />}
                    <div className={cx('intro-rate')}>{courseData.rating.toFixed(1)}</div>
                    <StarRating rating={4.6} style={{ color: 'var(--dark-yellow-color)' }} />
                    <div className={cx('rate-count')}>{`(${courseData.ratingCount.toLocaleString(
                        'en-US',
                    )} ratings)`}</div>

                    <div className={cx('student-count')}>{`${Number(1676840).toLocaleString('en-US')} students`}</div>
                </div>
            </div>
        </div>
    );
}

export default FixedSubHeader;
