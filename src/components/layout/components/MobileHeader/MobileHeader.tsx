import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import images from '~/assets/images';
import { getCart } from '~/lib/data';
import MobileCart from '../MobileCart';
import MobileSearch from '../MobileSearch';
import MobileMenuModal from '../MobileMenuModal';
import styles from './MobileHeader.module.scss';

const cx = classNames.bind(styles);

interface MobileHeaderProps {
    className?: string;
}

function MobileHeader({ className }: MobileHeaderProps) {
    const cartPromise = getCart();

    return (
        <header className={cx('wrapper', className)}>
            <div className={cx('header-container')}>
                {/* mobile menu */}
                <MobileMenuModal />

                <div className={cx('spacer')} />

                <div className={cx('header-logo')}>
                    <Link href="/" className={cx('header-logo-link')}>
                        <Image width={128} height={128} src={images.logo} alt="Logo image" loading="lazy" />
                    </Link>
                </div>

                {/* mobile search */}
                <MobileSearch />

                {/* mobile cart */}
                <MobileCart cartPromise={cartPromise} />
            </div>
        </header>
    );
}

export default MobileHeader;
