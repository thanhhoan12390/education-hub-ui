'use client';

import classNames from 'classnames/bind';
import useSWR from 'swr';
import { memo } from 'react';

import CourseDescription from '~/components/features/course/CourseDescription';
import { Course } from '~/types';
import styles from './DashboardDescription.module.scss';

const cx = classNames.bind(styles);

interface DashboardDescriptionProps {
    courseId: number;
}

// vì component này import vào page client nên dùng swr
function DashboardDescription({ courseId }: DashboardDescriptionProps) {
    const courseUrl = `/api/courses/${courseId}`;

    const { data: courseData } = useSWR<Course>(courseUrl, {
        revalidateOnFocus: false,
    });

    return (
        <div className={cx('wrapper')}>
            <CourseDescription lightTheme course={courseData} />
            <div className={cx('des-content')}>
                <h2 className={cx('related-heading')}>Description</h2>
                <div>
                    <p>*Update 2025: Intro to Data Science module updated for recent AI developments*</p>
                    <p>The Problem</p>
                    <p>
                        Data scientist is one of the best suited professions to thrive this century. It is digital,
                        programming-oriented, and analytical. Therefore, it comes as no surprise that the demand for
                        data scientists has been surging in the job marketplace.
                    </p>
                    <p>
                        However, supply has been very limited. It is difficult to acquire the skills necessary to be
                        hired as a data scientist.
                    </p>
                    <p>And how can you do that?</p>
                    <p>
                        Universities have been slow at creating specialized data science programs. (not to mention that
                        the ones that exist are very expensive and time consuming)
                    </p>
                    <p>
                        Most online courses focus on a specific topic and it is difficult to understand how the skill
                        they teach fit in the complete picture
                    </p>
                </div>
            </div>
        </div>
    );
}

export default memo(DashboardDescription);
