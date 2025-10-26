'use client';

import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import type { MenuItem } from '~/types';
import Divider from '../Divider';
import PopperWrapper from '../PopperWrapper';
import styles from './MultiSubNavigationMenu.module.scss';

const cx = classNames.bind(styles);

interface MultiSubNavigationMenuProps {
    menuFieldData: MenuItem[];
    className?: string;
}

function MultiSubNavigationMenu({ menuFieldData, className }: MultiSubNavigationMenuProps) {
    /*
        history là một mảng lưu trữ dữ liệu các cấp khác nhau của menu, khi hover vào một field của 
        menu, mà field đó có cấp con, thì tiến hành lấy ra dữ liệu trước đó của menu (pre), cắt từ vị trí
        đầu đến parentIndex + 1, rồi thêm cấp tiếp theo đó vào 

        setHistory((pre) => {
            return [
                ...pre.slice(0, parentIndex + 1),
                { data: child.children },
            ];
        });

    */
    const [history, setHistory] = useState<{ data: MenuItem[] }[]>([{ data: menuFieldData }]);
    const [activePath, setActivePath] = useState<[number, number][]>([]);

    // hàm dùng để render tất cả các cấp hiện có của menu
    const renderMenu = () =>
        history.map((menuLevelData, parentIndex) => {
            return (
                menuLevelData.data.length > 0 && (
                    <div
                        className={cx('menu-container', {
                            ['not-first-menu-level']: parentIndex !== 0,
                        })}
                        key={parentIndex}
                    >
                        {menuLevelData.data.map((item, linkGroupIndex) => (
                            <Fragment key={linkGroupIndex}>
                                {linkGroupIndex > 0 && <Divider />}
                                {item.title && <h2 className={cx('nav-heading')}>{item.title}</h2>}
                                <ul className={cx('nav-list')}>
                                    {item.children.map((child, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                className={cx(`nav-link`, {
                                                    'active-link':
                                                        activePath[parentIndex]?.[0] === linkGroupIndex &&
                                                        activePath[parentIndex]?.[1] === linkIndex,
                                                })}
                                                onMouseOver={() => {
                                                    setHistory((pre) => {
                                                        return [
                                                            ...pre.slice(0, parentIndex + 1),
                                                            { data: child.children },
                                                        ];
                                                    });

                                                    // Lưu lại index của nhánh menu đang active, không lưu index của
                                                    // node mà không có children
                                                    setActivePath((pre) => {
                                                        return child.children.length > 0
                                                            ? [
                                                                  ...pre.slice(0, parentIndex),
                                                                  [linkGroupIndex, linkIndex],
                                                              ]
                                                            : [...pre.slice(0, parentIndex)];
                                                    });
                                                }}
                                                href={child.to}
                                            >
                                                {child.title}
                                                {child.children.length > 0 && (
                                                    <div className={cx('icon-container')}>
                                                        <FontAwesomeIcon
                                                            icon={faChevronRight}
                                                            className={cx('link-icon')}
                                                        />
                                                    </div>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Fragment>
                        ))}
                    </div>
                )
            );
        });

    return (
        <PopperWrapper className={cx(className)}>
            <div className={cx('content')}>{renderMenu()}</div>
        </PopperWrapper>
    );
}

export default MultiSubNavigationMenu;
