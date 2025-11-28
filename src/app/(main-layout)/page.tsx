import classNames from 'classnames/bind';

import Divider from '~/components/ui/Divider';
import NavBar from '~/components/ui/NavBar';
import ImageSlider from '~/components/ui/ImageSlider';
import FlexibleButton from '~/components/ui/FlexibleButton/FlexibleButton';
import CardCarousel from '~/components/ui/CardCarousel/CardCarousel';
import images from '~/assets/images';
import { getCourses } from '~/lib/data';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const coursesPromise = getCourses();

    const bannerFloatContent = (title: string, content: React.ReactNode) => (
        <div className={cx('banner-float-content')}>
            <h1 className={cx('banner-heading')}>{title}</h1>
            {content}
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <Divider />
            <NavBar className={cx('navbar')} />

            <div className={cx('home-container')}>
                <div className={cx('home-content')}>
                    {/** banner */}
                    <div className={cx('banner-container')}>
                        <div className={cx('welcome-area')}>
                            <div style={{ width: '6.4rem', height: '6.4rem' }} className={cx('default-avatar')}>
                                HT
                            </div>
                            <div className={cx('user-detail')}>
                                <h3 className={cx('welcome-heading')}>Welcome back</h3>
                                <div className={cx('welcome-btn')}>
                                    <FlexibleButton small hover underlined>
                                        Add occupation and interests
                                    </FlexibleButton>
                                </div>
                            </div>
                        </div>
                        <ImageSlider
                            carouselData={[
                                {
                                    img: images.homeSliderImg0,
                                    floatContent: bannerFloatContent(
                                        '24-Hour Flash Sale',
                                        <p>
                                            Learn valuable, practical skills for as low as ₫279,000. Sale ends tonight!
                                        </p>,
                                    ),
                                },

                                {
                                    img: images.homeSliderImg1,
                                    floatContent: bannerFloatContent(
                                        'Prep for your IT certificate',
                                        <p>
                                            Explore a future in IT. Start learning toward AWS certification, CompTIA A+
                                            certification, and more.
                                        </p>,
                                    ),
                                },

                                {
                                    img: images.homeSliderImg2,
                                    floatContent: bannerFloatContent(
                                        'Learn from anywhere',
                                        <p>
                                            On the couch, from the backyard, or on your commute. Our app lets you
                                            decide.
                                        </p>,
                                    ),
                                },
                            ]}
                        />
                    </div>

                    {/** page container */}
                    <div className={cx('page-container')}>
                        {/** advertising banner */}
                        <div className={cx('page-advertising')}>
                            <span>Training 2 or more people?</span>
                            <span>Get your team access to top 30,000+ courses</span>
                        </div>

                        {/** courses section */}
                        <div className={cx('courses-section')}>
                            <h2 className={cx('courses-heading')}>What to learn next</h2>
                            <CardCarousel carouselHeading="Recommended for you" courses={coursesPromise} />
                            <CardCarousel carouselHeading="Short and sweet courses for you" courses={coursesPromise} />
                            <CardCarousel carouselHeading="Newest courses in Data Science" courses={coursesPromise} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
