'use client';

import classNames from 'classnames/bind';
import { useState, useImperativeHandle, memo } from 'react';

import styles from './DashboardTab.module.scss';

const cx = classNames.bind(styles);

interface DashboardTabProps {
    defaultIndex?: number;
    tabTitles: React.ReactNode[];
    children: React.ReactNode[];
    ref?: React.Ref<{ onTabIndexChange: React.Dispatch<React.SetStateAction<number>> }>;
}

function DashboardTab({ defaultIndex, children, tabTitles, ref }: DashboardTabProps) {
    const [tabIndex, setTabIndex] = useState(defaultIndex || 0);

    useImperativeHandle(ref, () => {
        return {
            onTabIndexChange: setTabIndex,
        };
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-container')}>
                {tabTitles.map((item, index) => {
                    if (!item) {
                        return;
                    }

                    return (
                        <div
                            key={index}
                            className={cx('tab-title', {
                                ['tab-active']: tabIndex === index,
                            })}
                            onClick={() => setTabIndex(index)}
                        >
                            <h2 className={cx('tab-heading')}>{item}</h2>
                        </div>
                    );
                })}
            </div>
            <div className={cx('tab-container')}>
                {children.map((child, index) => (
                    <div
                        key={index}
                        className={cx('tab-content', {
                            ['tab-content-active']: tabIndex === index,
                        })}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(DashboardTab);
