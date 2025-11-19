import classNames from 'classnames/bind';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { Course } from '~/types';
import Divider from '~/components/ui/Divider';
import styles from './MyCourseItem.module.scss';

const cx = classNames.bind(styles);

interface MyCourseItemProps {
    course: Course;
}

function MyCourseItem({ course }: MyCourseItemProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('img-container')}>
                    <Image src={course.imageUrl} alt="my course img" width={480} height={270} />
                    <div className={cx('img-overlay')}>
                        <span className={cx('play-btn')}>
                            <FontAwesomeIcon fontSize="2rem" icon={faPlay} />
                        </span>
                    </div>
                </div>
                <div className={cx('main-container')}>
                    <h3 className={cx('course-title')}>{course.title}</h3>
                    <div className={cx('course-instructor')}>{course.instructor}</div>
                    <Divider className={cx('divider')} />
                    <div className={cx('footer-text')}>START COURSE</div>
                </div>
            </div>
        </div>
    );
}

export default MyCourseItem;
