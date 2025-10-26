import classNames from 'classnames/bind';

import styles from './Divider.module.scss';

const cx = classNames.bind(styles);

interface DividerProps {
    className?: string;
}

function Divider({ className }: DividerProps) {
    return <div className={cx('wrapper', className)}></div>;
}

export default Divider;
