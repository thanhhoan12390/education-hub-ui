'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './AccordionPanel.module.scss';

const cx = classNames.bind(styles);

interface AccordionPanelProps {
    className?: string;
    heading: string;
    totalLecture: number | string;
    totalLectureMin: number | string;
    children: React.ReactNode;
    defaultExpand?: boolean;
}

function AccordionPanel({
    heading,
    totalLecture,
    totalLectureMin,
    defaultExpand,
    children,
    className,
}: AccordionPanelProps) {
    const [isContentOpen, setIsContentOpen] = useState(defaultExpand || false);

    return (
        <div className={cx('wrapper', className)}>
            <div onClick={() => setIsContentOpen(!isContentOpen)} className={cx('panel-title')}>
                <FontAwesomeIcon
                    className={cx('title-icon', {
                        ['expand-panel-icon-rotate']: isContentOpen,
                    })}
                    icon={faChevronDown}
                />
                <h3 className={cx('panel-heading-group')}>
                    <span className={cx('panel-heading')}>{heading}</span>
                    <span className={cx('total-lecture')}>
                        {totalLecture == 1 ? `1 lecture` : `${totalLecture} lectures`} •
                        <span>{totalLectureMin} min</span>
                    </span>
                </h3>
            </div>
            <div
                className={cx('panel-container', {
                    ['panel-container-expand']: isContentOpen,
                })}
            >
                <div className={cx('panel-content')}>{children}</div>
            </div>
        </div>
    );
}

export default AccordionPanel;
