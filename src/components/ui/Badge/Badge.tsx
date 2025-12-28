import classNames from 'classnames/bind';

import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

function Badge({ className }: { className?: string }) {
    return <div className={cx('badge-tag', className)}>Bestseller</div>;
}

export default Badge;
