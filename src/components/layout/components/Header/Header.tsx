import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import { CartIcon } from '~/components/ui/Icons';
import MultiSubNavigationMenu from '~/components/ui/MultiSubNavigationMenu';
import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import SearchBar from '../SearchBar';
import type { MenuItem } from '~/types';
import styles from './Header.module.scss'; // luôn để import styles ở vị trí cuối cùng để ghi đè CSS của các component ở trên

const cx = classNames.bind(styles);

const exploreMenuData: MenuItem[] = [
    {
        title: 'Explore by Goal',
        to: '',
        children: [
            {
                title: 'Learn AI',
                to: '',
                children: [
                    {
                        title: null,
                        to: '',
                        children: [
                            {
                                title: 'AI Fundamentals',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'AI For Professionals',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'AI For Developers',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'AI For Creatives',
                                to: '',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Launch a new career',
                to: '',
                children: [],
            },
            {
                title: 'Prepare for a certification',
                to: '',
                children: [
                    {
                        title: 'Popular Issuers',
                        to: '',
                        children: [
                            {
                                title: 'Amazon Web Services (AWS) Certifications',
                                to: '',
                                children: [
                                    {
                                        title: null,
                                        to: '',
                                        children: [
                                            {
                                                title: 'AWS Certified Solutions Architect - Associate',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'AWS Certified Cloud Practitioner',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'AWS Certified Developer - Associate',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'Microsoft Certifications',
                                to: '',
                                children: [
                                    {
                                        title: null,
                                        to: '',
                                        children: [
                                            {
                                                title: 'Microsoft Certified: Azure Fundamentals',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Microsoft Certified: Azure Administrator Associate',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Microsoft Certified: Azure Developer Associate',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'Cisco Certifications',
                                to: '',
                                children: [],
                            },
                        ],
                    },
                    {
                        title: 'Popular Subjects',
                        to: '',
                        children: [
                            {
                                title: 'Cloud Certification',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Networking Certification',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Cybersecurity Certification',
                                to: '',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Practice with Role Play',
                to: '',
                children: [],
            },
        ],
    },
    {
        title: null,
        to: '',
        children: [
            {
                title: 'Development',
                to: '',
                children: [],
            },
            {
                title: 'Business',
                to: '',
                children: [],
            },
            {
                title: 'Finance & Accounting',
                to: '',
                children: [],
            },
            {
                title: 'IT & Software',
                to: '',
                children: [],
            },
        ],
    },
];

function Header() {
    return (
        <div className={cx('header-wrapper')}>
            <Link href="/" className={cx('header-logo')}>
                <Image width={128} height={128} src={images.logo} alt="Logo image" loading="lazy" />
            </Link>
            <nav className={cx('nav-item', 'nav-explore')}>
                <Link className={cx('nav-link')} href="">
                    Explore
                </Link>

                <MultiSubNavigationMenu menuFieldData={exploreMenuData} className={cx('multi-nav-menu')} />
            </nav>

            {/* Search bar */}
            <SearchBar />

            <div className={cx('nav-item', 'nav-business', 'align-end')}>
                <Link className={cx('nav-link')} href="">
                    My Business
                </Link>

                <PopperWrapper className={cx('nav-business-wrapper')}>
                    <div className={cx('nav-business-content')}>
                        <div className={cx('nav-business-text')}>
                            Get your team access to over 30,000 top Udemy courses, anytime, anywhere.
                        </div>
                        <FlexibleButton primary>Try Academy Business</FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item', 'nav-teaching')}>
                <Link className={cx('nav-link')} href="">
                    Teach on App
                </Link>

                <PopperWrapper className={cx('nav-teaching-wrapper')}>
                    <div className={cx('nav-teaching-content')}>
                        <div className={cx('nav-teaching-text')}>
                            Turn what you know into an opportunity and reach millions around the world.
                        </div>
                        <FlexibleButton primary>Learn more</FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item', 'nav-learning')}>
                <Link className={cx('nav-link')} href="">
                    My learning
                </Link>

                <PopperWrapper className={cx('nav-learning-wrapper')}>
                    <div className={cx('nav-learning-content')}>
                        <div className={cx('nav-learning-text')}>Start learning today.</div>
                        <FlexibleButton outline>Browser now</FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item', 'nav-wishlist')}>
                <Link className={cx('nav-link')} href="">
                    <FontAwesomeIcon icon={faHeart} className={cx('nav-icon')} />
                </Link>

                <PopperWrapper className={cx('nav-wishlist-wrapper')}>
                    <div className={cx('nav-wishlist-content')}>
                        <div className={cx('nav-wishlist-text')}>Your wishlist is empty.</div>
                        <FlexibleButton text>Explore courses</FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item', 'nav-cart')}>
                <Link className={cx('nav-link')} href="">
                    <CartIcon width="2rem" height="2rem" className={cx('nav-icon')} />
                </Link>

                <PopperWrapper className={cx('nav-cart-wrapper')}>
                    <div className={cx('nav-cart-content')}>
                        <div className={cx('nav-cart-text')}>Your wishlist is empty.</div>
                        <FlexibleButton text>Keep shopping</FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item', 'nav-notify')}>
                <Link className={cx('nav-link')} href="">
                    <FontAwesomeIcon icon={faBell} className={cx('nav-icon')} />
                </Link>

                <PopperWrapper className={cx('nav-notify-wrapper')}>
                    <div className={cx('nav-notify-content')}>
                        <div className={cx('nav-notify-header')}>
                            <div className={cx('nav-notify-heading')}>Notifications</div>
                            <FlexibleButton text className={cx('nav-notify-setting')}>
                                Settings
                            </FlexibleButton>
                        </div>
                        <div className={cx('nav-notify-text')}>No notifications.</div>
                    </div>
                </PopperWrapper>
            </div>

            <div className={cx('nav-item')}>
                <Link className={cx('nav-link')} href="">
                    <div className={cx('avatar')}>HT</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
