import classNames from 'classnames/bind';

import HeaderWrapper from '../components/HeaderWrapper';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
