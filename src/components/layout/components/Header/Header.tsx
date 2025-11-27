import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import MultiSubNavigationMenu from '~/components/ui/MultiSubNavigationMenu';
import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import SearchBar from '~/components/layout/components/SearchBar';
import type { MenuItem } from '~/types';
import HeaderCart from '~/components/layout/components/HeaderCart';
import { getCartDetail, getPurchasedListDetail, getWishlistDetail } from '~/lib/data';
import HeaderWishlist from '~/components/layout/components/HeaderWishlist';
import HeaderLearn from '~/components/layout/components/HeaderLearn/HeaderLearn';
import Divider from '~/components/ui/Divider/Divider';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
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
                                children: [
                                    {
                                        title: 'Popular topics',
                                        to: '',
                                        children: [
                                            {
                                                title: 'Prompt Engineering',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Large Language Models (LLM)',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Generative AI (GenAI)',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'AI Agents & Agentic AI',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'AI For Professionals',
                                to: '',
                                children: [
                                    {
                                        title: 'Popular topics',
                                        to: '',
                                        children: [
                                            {
                                                title: 'ChatGPT',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Microsoft Copilot',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Google Gemini (Bard)',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Claude AI',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'AI Content Generation',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Perplexity AI',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Agentforce',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'AI For Developers',
                                to: '',
                                children: [
                                    {
                                        title: 'Popular topics',
                                        to: '',
                                        children: [
                                            {
                                                title: 'OpenAI API',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'GitHub Copilot',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Azure Machine Learning',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Retrieval Augmented Generation (RAG)',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'LangChain',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'MLOps',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'TensorFlow',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'AI For Creatives',
                                to: '',
                                children: [
                                    {
                                        title: 'Popular topics',
                                        to: '',
                                        children: [
                                            {
                                                title: 'DALL·E',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Midjourney',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Stable Diffusion',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'Leonardo.Ai',
                                                to: '',
                                                children: [],
                                            },
                                            {
                                                title: 'AI Art Generation',
                                                to: '',
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Launch a new career',
                to: '',
                children: [
                    {
                        title: 'In-demand Careers',
                        to: '',
                        children: [
                            {
                                title: 'Cloud Engineer',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Data Scientist',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Digital Marketer',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Full Stack Web Developer',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Game Developer',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Project Manager',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Machine Learning Engineer',
                                to: '',
                                children: [],
                            },
                            {
                                title: 'Cybersecurity Analyst',
                                to: '',
                                children: [],
                            },
                        ],
                    },
                ],
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
    const cartPromise = getCartDetail();
    const wishlistPromise = getWishlistDetail();
    const purchasedListPromise = getPurchasedListDetail();

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
                            Get your team access to over 30,000 top courses, anytime, anywhere.
                        </div>
                        <FlexibleButton disabled primary>
                            Try Business
                        </FlexibleButton>
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
                        <FlexibleButton disabled primary>
                            Learn more
                        </FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <HeaderLearn purchasedListPromise={purchasedListPromise} />

            <HeaderWishlist className={cx('nav-wishlist')} wishlistPromise={wishlistPromise} />

            <HeaderCart cartPromise={cartPromise} />

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

            <div className={cx('nav-item', 'nav-avatar')}>
                <Link className={cx('nav-link')} href="">
                    <div className={cx('avatar')}>HT</div>
                </Link>

                <PopperWrapper className={cx('nav-avatar-wrapper')}>
                    <div className={cx('nav-avatar-content')}>
                        <div className={cx('nav-avatar-header')}>
                            <div className={cx('avatar', 'popper-avatar')}>HT</div>

                            <div className={cx('avatar-name-group')}>
                                <div className={cx('avatar-name')}>Phan Thanh Hoan</div>
                                <div className={cx('avatar-email')}>hoanphantcgpocket@gmail.com</div>
                            </div>
                        </div>
                        <Divider />
                        <ul className={cx('nav-avatar-links')}>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="/my-courses">
                                    My Learning
                                </Link>
                            </li>

                            <li>
                                <Link className={cx('nav-avatar-link')} href="/cart">
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="/wishlist">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link className={cx('nav-avatar-link')} href="">
                                    Notifications
                                </Link>
                            </li>
                        </ul>
                        <Divider />

                        <div className={cx('nav-avatar-language')}>
                            <div className={cx('nav-language-group')}>
                                <div className={cx('language-heading')}>Language</div>
                                <div className={cx('language-group')}>
                                    <span>English</span>
                                    <FontAwesomeIcon icon={faEarth} />
                                </div>
                            </div>
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        </div>
    );
}

export default Header;
