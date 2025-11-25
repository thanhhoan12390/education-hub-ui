'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { useState, useMemo, memo } from 'react';

import styles from './StudyAccordionPanel.module.scss';

const cx = classNames.bind(styles);

interface StudyAccordionPanelProps {
    className?: string;
    defaultExpand?: boolean;
    panelIndex?: number;
    panelTitle?: string;
    panelContent?: {
        lectureHeading: string;
        lectureMin: number;
    }[];
    contentStartIndex?: number;
    activeItemIndex?: number;
    onActiveChange?: (idx: number) => void;
}

function StudyAccordionPanel({
    defaultExpand,
    className,
    panelIndex,
    panelTitle,
    panelContent,
    contentStartIndex = 0,
    activeItemIndex,
    onActiveChange,
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
                        const panelOrderNum = panelItemIndex + contentStartIndex;

                        return (
                            <div
                                key={index}
                                className={cx('content-item', {
                                    ['content-item-active']: panelOrderNum === activeItemIndex,
                                })}
                                onClick={() => onActiveChange && onActiveChange(panelOrderNum)}
                            >
                                <label className={cx('checkbox-container')} onClick={(e) => e.stopPropagation()}>
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
                                        {panelOrderNum}.&nbsp;{item.lectureHeading}
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

export default memo(StudyAccordionPanel);
