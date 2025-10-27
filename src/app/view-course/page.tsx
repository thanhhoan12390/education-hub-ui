import classNames from 'classnames/bind';

import styles from './ViewCourse.module.scss';

const cx = classNames.bind(styles);

function ViewCourse() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-container')}>
                <div className={cx('top-content')}></div>
            </div>

            <div className={cx('absolute-sidebar')}>
                <div className={cx('sidebar-content')}></div>
            </div>

            <div className={cx('bot-container')}>
                <div className={cx('bot-content')}></div>
            </div>
        </div>
    );
}

export default ViewCourse;
