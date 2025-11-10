import classNames from 'classnames/bind';
import { use } from 'react';

import PopperWrapper from '~/components/ui/PopperWrapper';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { Course } from '~/types';
import styles from './HeaderCart.module.scss';

const cx = classNames.bind(styles);

interface HeaderCartProps {
    className?: string;
    cartPromise: Promise<Course[]>;
}

function HeaderCart({ className, cartPromise }: HeaderCartProps) {
    const cartData = use(cartPromise);

    return (
        <PopperWrapper className={cx('wrapper', className)}>
            <div className={cx('nav-cart-content')}>
                <div className={cx('nav-cart-text')}>Your cart is empty.</div>
                <FlexibleButton href="/" text>
                    Keep shopping
                </FlexibleButton>
            </div>
        </PopperWrapper>
    );
}

export default HeaderCart;
