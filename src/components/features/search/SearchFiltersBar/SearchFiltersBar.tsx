'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCode, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/lib/hooks';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { ListIcon } from '~/components/ui/Icons';
import ClickableDropdown from '~/components/ui/ClickableDropdown';
import CustomCheckbox from '~/components/ui/CustomCheckbox';
import CustomRadio from '~/components/ui/CustomRadio';
import StarRating from '~/components/ui/StarRating';
import { selectHasExercises, toggleExercises } from '~/lib/features/search/searchFilterSlice';
import styles from './SearchFiltersBar.module.scss';

const cx = classNames.bind(styles);

function SearchFiltersBar() {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
    const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
    const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
    const [radioCheckedId, setRadioCheckedId] = useState<number | null>(null);
    const [languageCheckedList, setLanguageCheckedList] = useState<Array<string>>([]);
    const [levelCheckedList, setLevelCheckedList] = useState<Array<string>>([]);

    const hasExercises = useAppSelector(selectHasExercises);

    console.log(hasExercises);

    const dispatch = useAppDispatch();

    const handleLanguageCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguageCheckedList((pre) => {
            const value = e.target.value;

            if (pre?.includes(value)) {
                return pre.filter((item) => item !== value);
            } else {
                return [...pre, value];
            }
        });
    };

    const handleLevelCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevelCheckedList((pre) => {
            const value = e.target.value;

            if (pre?.includes(value)) {
                return pre.filter((item) => item !== value);
            } else {
                return [...pre, value];
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filters-bar')}>
                <FlexibleButton outline rounded className={cx('search-style-btn')}>
                    <ListIcon height="1.6rem" width="1.6rem" />
                    <span>All filters</span>
                </FlexibleButton>

                <FlexibleButton
                    onClick={() => dispatch(toggleExercises())}
                    outline
                    rounded
                    className={cx('search-style-btn')}
                >
                    <FontAwesomeIcon icon={faCode} fontSize="1.2rem" />
                    <span>Coding Exercises</span>
                </FlexibleButton>

                <FlexibleButton outline rounded className={cx('search-style-btn')}>
                    <FontAwesomeIcon icon={faPencil} fontSize="1.2rem" />
                    <span>Practice Tests</span>
                </FlexibleButton>

                <ClickableDropdown
                    isOpen={isLanguageDropdownOpen}
                    onClose={() => setIsLanguageDropdownOpen(false)}
                    dropdownContent={
                        <div tabIndex={-1} className={cx('checklist-dropdown-content')}>
                            <ul className={cx('checklist-list')}>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={languageCheckedList?.includes('en')}
                                            onChange={handleLanguageCheckedList}
                                            value="en"
                                        />
                                        English
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={languageCheckedList?.includes('es')}
                                            onChange={handleLanguageCheckedList}
                                            value="es"
                                        />
                                        Español
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={languageCheckedList?.includes('tr')}
                                            onChange={handleLanguageCheckedList}
                                            value="tr"
                                        />
                                        Türkçe
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={languageCheckedList?.includes('pt')}
                                            onChange={handleLanguageCheckedList}
                                            value="pt"
                                        />
                                        Português
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={languageCheckedList?.includes('ar')}
                                            onChange={handleLanguageCheckedList}
                                            value="ar"
                                        />
                                        العربية
                                    </label>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <FlexibleButton
                        outline
                        rounded
                        className={cx('search-style-btn')}
                        onClick={() => setIsLanguageDropdownOpen((pre) => !pre)}
                    >
                        <span>Language</span>
                        <FontAwesomeIcon icon={faChevronDown} fontSize="1rem" />
                    </FlexibleButton>
                </ClickableDropdown>

                <ClickableDropdown
                    isOpen={isRatingDropdownOpen}
                    onClose={() => setIsRatingDropdownOpen(false)}
                    dropdownContent={
                        <div tabIndex={-1} className={cx('checklist-dropdown-content')}>
                            <ul className={cx('checklist-list')}>
                                <li>
                                    <label className={cx('checklist-item', 'rating-item')}>
                                        <CustomRadio
                                            checked={radioCheckedId === 4.5}
                                            onChange={(e) => setRadioCheckedId(+e.target.value)}
                                            value={4.5}
                                        />
                                        <span>
                                            <StarRating rating={4.5} isPreventDefault={false} />
                                            4.5 &amp; up
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item', 'rating-item')}>
                                        <CustomRadio
                                            checked={radioCheckedId === 4}
                                            onChange={(e) => setRadioCheckedId(+e.target.value)}
                                            value={4}
                                        />
                                        <span>
                                            <StarRating rating={4} isPreventDefault={false} />
                                            4.0 &amp; up
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item', 'rating-item')}>
                                        <CustomRadio
                                            checked={radioCheckedId === 3.5}
                                            onChange={(e) => setRadioCheckedId(+e.target.value)}
                                            value={3.5}
                                        />
                                        <span>
                                            <StarRating rating={3.5} isPreventDefault={false} />
                                            3.5 &amp; up
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item', 'rating-item')}>
                                        <CustomRadio
                                            checked={radioCheckedId === 3}
                                            onChange={(e) => setRadioCheckedId(+e.target.value)}
                                            value={3}
                                        />
                                        <span>
                                            <StarRating rating={3} isPreventDefault={false} />
                                            3.0 &amp; up
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <FlexibleButton
                        outline
                        rounded
                        className={cx('search-style-btn')}
                        onClick={() => setIsRatingDropdownOpen((pre) => !pre)}
                    >
                        <span>Rating</span>
                        <FontAwesomeIcon icon={faChevronDown} fontSize="1rem" />
                    </FlexibleButton>
                </ClickableDropdown>

                <ClickableDropdown
                    isOpen={isLevelDropdownOpen}
                    onClose={() => setIsLevelDropdownOpen(false)}
                    dropdownContent={
                        <div tabIndex={-1} className={cx('checklist-dropdown-content')}>
                            <ul className={cx('checklist-list')}>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={levelCheckedList.includes('all')}
                                            onChange={handleLevelCheckedList}
                                            value="all"
                                        />
                                        All Levels
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={levelCheckedList.includes('beginner')}
                                            onChange={handleLevelCheckedList}
                                            value="beginner"
                                        />
                                        Beginner
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={levelCheckedList.includes('intermediate')}
                                            onChange={handleLevelCheckedList}
                                            value="intermediate"
                                        />
                                        Intermediate
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={levelCheckedList.includes('expert')}
                                            onChange={handleLevelCheckedList}
                                            value="expert"
                                        />
                                        Expert
                                    </label>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <FlexibleButton
                        outline
                        rounded
                        className={cx('search-style-btn')}
                        onClick={() => setIsLevelDropdownOpen((pre) => !pre)}
                    >
                        <span>Level</span>
                        <FontAwesomeIcon icon={faChevronDown} fontSize="1rem" />
                    </FlexibleButton>
                </ClickableDropdown>
            </div>

            <div className={cx('sort-mode')}>
                <ClickableDropdown
                    className={cx('mode-dropdown')}
                    isOpen={isModeDropdownOpen}
                    dropdownWidth="100%"
                    onClose={() => setIsModeDropdownOpen(false)}
                    dropdownContent={
                        <div tabIndex={-1} className={cx('mode-dropdown-content')}>
                            <ul className={cx('mode-list')}>
                                <li>
                                    <div className={cx('mode-item')}>erwrewrew</div>
                                </li>
                                <li>
                                    <div className={cx('mode-item')}>erwrewrew</div>
                                </li>
                                <li>
                                    <div className={cx('mode-item')}>erwrewrew</div>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <FlexibleButton
                        outline
                        rounded
                        className={cx('search-style-btn', 'sort-mode-btn')}
                        onClick={() => setIsModeDropdownOpen((pre) => !pre)}
                    >
                        <span>Most Relevant</span>
                        <FontAwesomeIcon icon={faChevronDown} fontSize="1rem" />
                    </FlexibleButton>
                </ClickableDropdown>
            </div>
        </div>
    );
}

export default SearchFiltersBar;
