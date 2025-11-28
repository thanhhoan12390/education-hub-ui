'use client';

import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEarth } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import { MenuItem } from '~/types';
import FlexibleButton from '~/components/ui/FlexibleButton';
import styles from './MobileMultiSubMenu.module.scss';

const cx = classNames.bind(styles);

interface MobileMultiSubMenuProps {
    menuFieldData?: MenuItem[];
    open?: boolean;
    onClose?: () => void;
}

function MobileMultiSubMenu({ menuFieldData = [], open, onClose }: MobileMultiSubMenuProps) {
    const [history, setHistory] = useState<{ data: MenuItem[] }[]>([{ data: menuFieldData }]);
    const [subMenuTitle, setSubMenuTitle] = useState('');
    const current = history[history.length - 1];

    const router = useRouter();

    const handleBack = () => {
        setHistory((pre) => pre.slice(0, history.length - 1));
    };

    const getDeepestList = (data: MenuItem[]): MenuItem[] => {
        if (data.length === 0) return [];

        if (data.length > 1) {
            return data;
        }

        return getDeepestList(data[0].children);
    };

    const handleAddChild = (data: MenuItem[]) => {
        // hiện tại chỉ cho render 2 cấp
        if (data.length === 0 || history.length >= 2) return;

        setHistory((pre) => [...pre, { data }]);
    };

    const renderMenu = () => {
        let renderList = current.data;

        // Không render khi mảng có 1 phần tử và phần tử đó có title: null
        if (current.data.length === 1 && !current.data[0].title) {
            renderList = getDeepestList(current.data);
        }

        const isOnlySection = renderList.length === 1;

        return (
            <Fragment>
                {!isOnlySection && history.length >= 2 && (
                    <ul className={cx('section-list')}>
                        <li>
                            <button className={cx('section-item')}>
                                <div className={cx('section-text')}>{subMenuTitle}</div>
                            </button>
                        </li>
                    </ul>
                )}

                {/* rendered menu group */}
                {renderList.map((item, index) => {
                    const childrenList = getDeepestList(item.children);

                    return (
                        <div
                            style={{
                                borderBlockStart: isOnlySection ? 'none' : '',
                            }}
                            className={cx('menu-section-group')}
                            key={index}
                        >
                            <h2 className={cx('section-heading')}>{item.title ?? 'Most popular'}</h2>
                            <ul className={cx('section-list')}>
                                {childrenList.map((child, linkIndex) => {
                                    return (
                                        <li
                                            key={linkIndex}
                                            onClick={() => {
                                                // hiện tại chỉ cho render 2 cấp
                                                if (child.children.length > 0 && history.length < 2) {
                                                    setSubMenuTitle(child.title ?? '');
                                                }
                                                handleAddChild(child.children);
                                            }}
                                        >
                                            <button className={cx('section-item')}>
                                                <div className={cx('section-text')}>{child.title}</div>
                                                {history.length < 2 && child.children.length !== 0 && (
                                                    <div className={cx('chevron-icon')}>
                                                        <FontAwesomeIcon fontSize="1rem" icon={faChevronRight} />
                                                    </div>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </Fragment>
        );
    };

    return (
        <Fragment>
            {history.length === 1 && (
                <div
                    className={cx('wrapper', {
                        ['menu-show']: open,
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cx('menu-container')}>
                        <div className={cx('welcome-section')}>
                            <div className={cx('avatar')}>HT</div>

                            <div className={cx('avatar-name-group')}>
                                <div className={cx('avatar-name')}>Hi, Phan Thanh Hoan</div>
                                <div className={cx('avatar-text')}>Welcome back</div>
                            </div>
                            <div className={cx('chevron-icon')}>
                                <FontAwesomeIcon fontSize="1rem" icon={faChevronRight} />
                            </div>
                        </div>

                        <h2 className={cx('section-heading')}>Learn</h2>
                        <ul className={cx('section-list')}>
                            <li>
                                <button
                                    className={cx('section-item')}
                                    onClick={() => {
                                        router.push('/my-courses');
                                        onClose?.();
                                    }}
                                >
                                    <div className={cx('section-text')}>My learning</div>
                                </button>
                            </li>
                        </ul>

                        {/* rendered menu */}
                        {renderMenu()}

                        <h2
                            style={{ borderBlockStart: '1px solid var(--border-color)' }}
                            className={cx('section-heading')}
                        >
                            More on website
                        </h2>
                        <ul className={cx('section-list')}>
                            <li>
                                <button className={cx('section-item')}>
                                    <div className={cx('section-text')}>Try Business</div>
                                </button>
                            </li>
                            <li>
                                <button className={cx('section-item')}>
                                    <div className={cx('section-text')}>Get the app</div>
                                </button>
                            </li>
                            <li>
                                <button className={cx('section-item')}>
                                    <div className={cx('section-text')}>Invite friends</div>
                                </button>
                            </li>
                            <li>
                                <button className={cx('section-item')}>
                                    <div className={cx('section-text')}>Help and Support</div>
                                </button>
                            </li>
                        </ul>

                        <FlexibleButton outline className={cx('language-btn')}>
                            <FontAwesomeIcon icon={faEarth} />
                            <span>English</span>
                        </FlexibleButton>
                    </div>
                </div>
            )}

            {history.length >= 2 && (
                <div
                    className={cx('wrapper', {
                        ['menu-show']: open,
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cx('menu-container')}>
                        <div onClick={handleBack} className={cx('back-btn')}>
                            <div className={cx('chevron-icon')}>
                                <FontAwesomeIcon fontSize="1rem" icon={faChevronLeft} />
                            </div>
                            <div className={cx('back-text')}>Menu</div>
                        </div>

                        {/* rendered menu */}
                        {renderMenu()}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default MobileMultiSubMenu;
