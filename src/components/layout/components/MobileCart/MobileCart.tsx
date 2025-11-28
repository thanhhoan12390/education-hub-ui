import classNames from 'classnames/bind';
import Link from 'next/link';
import { Badge } from 'antd';
import { use } from 'react';

import { CartIcon } from '~/components/ui/Icons';
import { Cart } from '~/types';
import styles from './MobileCart.module.scss';

const cx = classNames.bind(styles);

function MobileCart({ cartPromise }: { cartPromise: Promise<Cart> }) {
    const cart = use(cartPromise);

    return (
        <div className={cx('wrapper')}>
            <Link className={cx('nav-link')} href="/cart">
                <Badge color="#a435f0" style={{ fontSize: '1.2rem', fontWeight: '600' }} count={cart.courseIds.length}>
                    <CartIcon width="2rem" height="2rem" />
                </Badge>
            </Link>
        </div>
    );
}

export default MobileCart;
