'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { useState, useMemo } from 'react';

import styles from './StudyAccordionPanel.module.scss';

const cx = classNames.bind(styles);

interface StudyAccordionPanelProps {
    className?: string;
    defaultExpand?: boolean;
    panelTitle?: string;
    panelIndex?: number;
    panelContent?: {
        lectureHeading: string;
        lectureMin: number;
    }[];
    contentStartIndex?: number;
}

function StudyAccordionPanel({
    defaultExpand,
    className,
    panelTitle,
    panelIndex,
    panelContent,
    contentStartIndex = 0,
}: StudyAccordionPanelProps) {
    const [isContentOpen, setIsContentOpen] = useState(defaultExpand || false);
    const [checkedList, setCheckedList] = useState<number[]>([]);

    const totalMin = useMemo(
        () => panelContent?.reduce((totalMin, currItem) => totalMin + currItem.lectureMin, 0),
        [panelContent],
    );

    const handleCheck = (id: number) => {
        setCheckedList((pre) => {
            const isChecked = pre.includes(id);

            if (isChecked) {
                return pre.filter((item) => item !== id);
            } else {
                return [...pre, id];
            }
        });
    };
    return (
        <div className={cx('wrapper', className)}>
            <div onClick={() => setIsContentOpen(!isContentOpen)} className={cx('panel-title')}>
                <div className={cx('panel-heading-group')}>
                    <h3 className={cx('panel-heading')}>
                        Section {panelIndex}: {panelTitle}
                    </h3>
                    <div className={cx('total-lecture')}>
                        <span>
                            {checkedList.length} / {panelContent?.length}
                        </span>
                        &nbsp;|&nbsp;<span>{totalMin}min</span>
                    </div>
                </div>
                <FontAwesomeIcon
                    className={cx('title-icon', {
                        ['expand-panel-icon-rotate']: isContentOpen,
                    })}
                    icon={faChevronDown}
                />
            </div>
            <div
                className={cx('panel-container', {
                    ['panel-container-expand']: isContentOpen,
                })}
            >
                <div className={cx('panel-content')}>
                    {panelContent?.map((item, index) => {
                        const panelItemIndex = index + 1;

                        return (
                            <div key={index} className={cx('content-item')}>
                                <label className={cx('checkbox-container')}>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        checked={checkedList.includes(panelItemIndex)}
                                        onChange={() => handleCheck(panelItemIndex)}
                                    />
                                    <span className={cx('checkmark')} />
                                </label>

                                <div className={cx('des-group')}>
                                    <div className={cx('des-title')}>
                                        {panelItemIndex + contentStartIndex}.&nbsp;{item.lectureHeading}
                                    </div>
                                    <div className={cx('des-min')}>
                                        <FontAwesomeIcon fontSize="1.4rem" icon={faYoutubeSquare} />
                                        <span>{item.lectureMin}min</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default StudyAccordionPanel;
