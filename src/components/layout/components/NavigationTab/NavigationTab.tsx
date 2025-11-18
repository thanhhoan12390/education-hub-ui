'use client';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './NavigationTab.module.scss';

const cx = classNames.bind(styles);

interface NavigationTabProps {
    navigationTabData: {
        title: string;
        pathUrl: string;
    }[];
}

function NavigationTab({ navigationTabData }: NavigationTabProps) {
    const pathName = usePathname();

    return (
        <nav className={cx('wrapper')}>
            {navigationTabData.map((data, index) => (
                <Link
                    key={index}
                    className={cx('navigation-item', { ['tab-active']: data.pathUrl === pathName })}
                    href={data.pathUrl}
                >
                    {data.title}
                </Link>
            ))}
        </nav>
    );
}

export default NavigationTab;
