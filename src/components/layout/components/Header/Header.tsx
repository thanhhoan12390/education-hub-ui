import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import MultiSubNavigationMenu from '~/components/ui/MultiSubNavigationMenu';
import FlexibleButton from '~/components/ui/FlexibleButton';
import PopperWrapper from '~/components/ui/PopperWrapper';
import SearchBar from '../SearchBar';
import type { MenuItem } from '~/types';
import HeaderCart from '../HeaderCart';
import { getCartDetail, getWishlistDetail } from '~/lib/data';
import HeaderWishlist from '../HeaderWishlist';
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
                        <FlexibleButton href="/" outline>
                            Browser now
                        </FlexibleButton>
                    </div>
                </PopperWrapper>
            </div>

            <HeaderWishlist wishlistPromise={wishlistPromise} />

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

            <div className={cx('nav-item')}>
                <Link className={cx('nav-link')} href="">
                    <div className={cx('avatar')}>HT</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
