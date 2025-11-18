import classNames from 'classnames/bind';

import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

function MyCourses() {
    return <div className={cx('wrapper')}>My courses page</div>;
}

export default MyCourses;
