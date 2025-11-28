import classNames from 'classnames/bind';
import { Fragment, use } from 'react';
import Link from 'next/link';
import { Badge } from 'antd';

import { CartIcon } from '~/components/ui/Icons';
import PopperWrapper from '~/components/ui/PopperWrapper';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { Course } from '~/types';
import HeaderCartItem from '~/components/features/cart/HeaderCartItem';
import styles from './HeaderCart.module.scss';

const cx = classNames.bind(styles);

interface HeaderCartProps {
    className?: string;
    cartPromise: Promise<Course[]>;
}

function HeaderCart({ className, cartPromise }: HeaderCartProps) {
    const cartData = use(cartPromise);

    const totalPrice = cartData.reduce((total, item) => total + item.price, 0);

    return (
        <div className={cx('nav-item', className)}>
            <Link className={cx('nav-link')} href="/cart">
                <Badge
                    className={cx('cart-badge')}
                    color="#a435f0"
                    style={{ fontSize: '1.2rem', fontWeight: '600' }}
                    count={cartData.length}
                >
                    <CartIcon width="2rem" height="2rem" className={cx('nav-icon')} />
                </Badge>
            </Link>
            {/* Popper */}
            <PopperWrapper className={cx('nav-cart-wrapper')}>
                <div className={cx('cart-container')}>
                    {cartData.length > 0 ? (
                        <Fragment>
                            <div className={cx('cart-content')}>
                                {cartData.map((item) => (
                                    <HeaderCartItem key={item.courseId} cartItemData={item} />
                                ))}
                            </div>

                            <div className={cx('total-group')}>
                                <div className={cx('cart-price')}>
                                    <span>Total:&nbsp;</span>
                                    <div className={cx('total-price')}>
                                        <span>đ</span>
                                        {`${totalPrice.toLocaleString('en-US')}`}
                                    </div>
                                </div>
                                <FlexibleButton href="/cart" primary>
                                    Go to cart
                                </FlexibleButton>
                            </div>
                        </Fragment>
                    ) : (
                        <div className={cx('no-cart-content')}>
                            <div className={cx('nav-cart-text')}>Your cart is empty.</div>
                            <FlexibleButton href="/" text>
                                Keep shopping
                            </FlexibleButton>
                        </div>
                    )}
                </div>
            </PopperWrapper>
        </div>
    );
}

export default HeaderCart;
