'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DashboardTab.module.scss';

const cx = classNames.bind(styles);

interface DashboardTabProps {
    tabTitles: React.ReactNode[];
    children: React.ReactNode[];
}

function DashboardTab({ children, tabTitles }: DashboardTabProps) {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-container')}>
                {tabTitles.map((item, index) => (
                    <div
                        key={index}
                        className={cx('tab-title', {
                            ['tab-active']: tabIndex === index,
                        })}
                        onClick={() => setTabIndex(index)}
                    >
                        <h2 className={cx('tab-heading')}>{item}</h2>
                    </div>
                ))}
            </div>
            <div className={cx('tab-container')}>
                <div className={cx('tab-content')}>{children[tabIndex]}</div>
            </div>
        </div>
    );
}

export default DashboardTab;
