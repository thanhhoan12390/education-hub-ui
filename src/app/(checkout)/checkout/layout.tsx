import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import images from '~/assets/images';
import CancelButton from '~/components/features/checkout/CancelButton';
import styles from './Checkout.module.scss';

const cx = classNames.bind(styles);

export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('checkout-header')}>
                <Link href="/" className={cx('header-logo')}>
                    <Image width={128} height={128} src={images.logo} alt="Logo image" loading="lazy" />
                </Link>

                <CancelButton />
            </header>
            {children}
        </div>
    );
}
