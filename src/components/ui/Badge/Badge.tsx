import classNames from 'classnames/bind';

import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

function Badge() {
    return <div className={cx('badge-tag')}>Bestseller</div>;
}

export default Badge;
