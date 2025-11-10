import classNames from 'classnames/bind';

import styles from './HeaderCartItem.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface HeaderCartItemProps {
    className?: string;
}

function HeaderCartItem({ className }: HeaderCartItemProps) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('image-wrapper')}></div>
        </div>
    );
}

export default HeaderCartItem;
