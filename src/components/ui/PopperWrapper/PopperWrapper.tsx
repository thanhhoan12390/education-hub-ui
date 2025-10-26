import classNames from 'classnames/bind';

import styles from './PopperWrapper.module.scss';

const cx = classNames.bind(styles);

interface PopperWrapperProps {
    children: React.ReactElement;
    className?: string;
}

function PopperWrapper({ children, className }: PopperWrapperProps) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default PopperWrapper;
