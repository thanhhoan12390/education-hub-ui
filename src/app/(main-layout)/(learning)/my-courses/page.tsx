import classNames from 'classnames/bind';

import { getPurchasedListDetail } from '~/lib/data';
import MyCourseItem from '~/components/features/learning/MyCourseItem';
import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

async function MyCourses() {
    const purchasedList = await getPurchasedListDetail();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('my-course-list')}>
                    {purchasedList.map((item, index) => (
                        <MyCourseItem key={index} course={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyCourses;
