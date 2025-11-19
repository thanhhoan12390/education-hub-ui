'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useTransition } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { checkoutCourses } from '~/lib/actions';
import styles from './CheckoutButton.module.scss';

const cx = classNames.bind(styles);

interface CheckoutButtonProps {
    totalPrice: number;
    cart: number[];
}

function CheckoutButton({ totalPrice, cart }: CheckoutButtonProps) {
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleCheckout = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.stopPropagation();
        e.preventDefault();

        startTransition(async () => {
            await checkoutCourses(cart);
            router.push('/my-courses');
        });
    };

    if (isPending)
        return (
            <div className={cx('checkout-button-wrapper')}>
                <FlexibleButton large primary>
                    <Spin
                        style={{ color: 'var(--gray-color-100)' }}
                        indicator={<LoadingOutlined spin />}
                        size="large"
                    />
                </FlexibleButton>
            </div>
        );

    return (
        <div className={cx('checkout-button-wrapper')}>
            <FlexibleButton large primary onClick={handleCheckout}>
                <FontAwesomeIcon style={{ fontSize: '1.6rem', marginInlineEnd: '0.4rem' }} icon={faLockOpen} />
                <div className={cx('checkout-price')}>
                    Pay&nbsp;
                    <span>đ</span>
                    {`${totalPrice?.toLocaleString('en-US')}`}
                </div>
            </FlexibleButton>
        </div>
    );
}

export default CheckoutButton;
