import classNames from 'classnames/bind';

import SubNav from '../SubNav';
import styles from './NavBar.module.scss';

const cx = classNames.bind(styles);

interface NavBarProps {
    className?: string;
}

function NavBar({ className }: NavBarProps) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('nav-container')}>
                <SubNav
                    to=""
                    title="Development"
                    subContent={[
                        {
                            subTitle: 'Web Development',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Mobile Development',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Programming Languages',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Game Development',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Database Design & Development',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Software Testing',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Business"
                    subContent={[
                        {
                            subTitle: 'Entrepreneurship',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Communication',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Management',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Sales',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Business Strategy',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Finance & Accounting"
                    subContent={[
                        {
                            subTitle: 'Accounting & Bookkeeping',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Cryptocurrency & Blockchain',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Finance',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Financial Modeling & Analysis',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Investing & Trading',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="IT & Software"
                    subContent={[
                        {
                            subTitle: 'IT Certifications',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Network & Security',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Hardware',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Operating Systems & Servers',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Other IT & Software',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Office Productivity"
                    subContent={[
                        {
                            subTitle: 'Microsoft',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Apple',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Google',
                            subUrl: '',
                        },
                        {
                            subTitle: 'SAP',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Oracle',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Other Office Productivity',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Personal Development"
                    subContent={[
                        {
                            subTitle: 'Personal Transformation',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Personal Productivity',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Leadership',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Career Development',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Parenting & Relationships',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Design"
                    subContent={[
                        {
                            subTitle: 'Web Design',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Graphic Design & Illustration',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Design Tools',
                            subUrl: '',
                        },
                        {
                            subTitle: 'User Experience Design',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Game Design',
                            subUrl: '',
                        },
                        {
                            subTitle: '3D & Animation',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Marketing"
                    subContent={[
                        {
                            subTitle: 'Digital Marketing',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Search Engine Optimization',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Social Media Marketing',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Branding',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Marketing Fundamentals',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Marketing Analytics & Automation',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Health & Fitness"
                    subContent={[
                        {
                            subTitle: 'Fitness',
                            subUrl: '',
                        },
                        {
                            subTitle: 'General Health',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Sports',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Nutrition & Diet',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Yoga',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Mental Health',
                            subUrl: '',
                        },
                    ]}
                />

                <SubNav
                    to=""
                    title="Music"
                    subContent={[
                        {
                            subTitle: 'Instruments',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Music Production',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Music Fundamentals',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Vocal',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Music Techniques',
                            subUrl: '',
                        },
                        {
                            subTitle: 'Music Software',
                            subUrl: '',
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default NavBar;
