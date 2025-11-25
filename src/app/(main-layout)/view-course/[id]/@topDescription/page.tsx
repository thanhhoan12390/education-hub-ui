import classNames from 'classnames/bind';
import Link from 'next/link';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import CourseDescription from '~/components/features/course/CourseDescription';
import FixedSubHeader from '~/components/features/course/FixedSubHeader';
import { getCourseById } from '~/lib/data';
import styles from './TopDescription.module.scss';

const cx = classNames.bind(styles);

interface TopDescriptionProps {
    params: Promise<{ id: string }>;
}

async function TopDescription({ params }: TopDescriptionProps) {
    const { id } = await params;

    const course = await getCourseById(+id);

    return (
        <Fragment>
            <FixedSubHeader course={course} />
            <div className={cx('wrapper')}>
                <div className={cx('top-container')}>
                    <div className={cx('link-title')}>
                        <Link href={''}>Development</Link>
                        <FontAwesomeIcon fontSize={'0.8rem'} style={{ marginInline: '1.2rem' }} icon={faChevronRight} />
                        <Link href={''}>Programming course</Link>
                    </div>

                    <div className={cx('top-content')}>
                        <CourseDescription course={course} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TopDescription;
