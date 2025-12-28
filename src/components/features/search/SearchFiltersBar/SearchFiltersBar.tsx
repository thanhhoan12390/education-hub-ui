'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faCode, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/lib/hooks';

import FlexibleButton from '~/components/ui/FlexibleButton';
import { ListIcon } from '~/components/ui/Icons';
import ClickableDropdown from '~/components/ui/ClickableDropdown';
import CustomCheckbox from '~/components/ui/CustomCheckbox';
import CustomRadio from '~/components/ui/CustomRadio';
import StarRating from '~/components/ui/StarRating';
import {
    selectHasExercises,
    toggleExercises,
    addLanguage,
    addLevel,
    setRating,
    togglePracticeTest,
    selectRating,
    selectHasPracticeTest,
    selectLanguages,
    selectLevel,
    removeLanguage,
    clearRating,
    removeLevel,
} from '~/lib/features/search/searchFilterSlice';
import type { Language, Level } from '~/lib/features/search/searchFilterSlice';
import styles from './SearchFiltersBar.module.scss';

const cx = classNames.bind(styles);

type SortMode = 'highest-rated' | 'relevant' | 'most-reviewed' | 'newest';

const sortModeSelectData: { value: SortMode; label: string }[] = [
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'most-reviewed', label: 'Most Reviewed' },
    { value: 'newest', label: 'Newest' },
];

function SearchFiltersBar() {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
    const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
    const [selectedSortMode, setSelectedSortMode] = useState<SortMode>('relevant');

    const hasExercises = useAppSelector(selectHasExercises);
    const hasPracticeTest = useAppSelector(selectHasPracticeTest);
    const selectedLanguages = useAppSelector(selectLanguages);
    const selectedLevel = useAppSelector(selectLevel);
    const selectedRating = useAppSelector(selectRating);

    const dispatch = useAppDispatch();

    const handleLanguageCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Language;

        if (selectedLanguages?.includes(value)) {
            dispatch(removeLanguage(value));
        } else {
            dispatch(addLanguage(value));
        }
    };

    const handleLevelCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Level;

        if (selectedLevel?.includes(value)) {
            dispatch(removeLevel(value));
        } else {
            dispatch(addLevel(value));
        }
    };

    const orderSortMode = useMemo(
        () => [
            ...sortModeSelectData.filter((item) => item.value === selectedSortMode),
            ...sortModeSelectData.filter((item) => item.value !== selectedSortMode),
        ],
        [selectedSortMode],
    );

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
                    className={cx('search-style-btn', {
                        ['search-style-btn-active']: hasExercises,
                    })}
                >
                    {hasExercises ? (
                        <FontAwesomeIcon icon={faCheck} fontSize="1.2rem" />
                    ) : (
                        <FontAwesomeIcon icon={faCode} fontSize="1.2rem" />
                    )}
                    <span>Coding Exercises</span>
                </FlexibleButton>

                <FlexibleButton
                    onClick={() => dispatch(togglePracticeTest())}
                    outline
                    rounded
                    className={cx('search-style-btn', {
                        ['search-style-btn-active']: hasPracticeTest,
                    })}
                >
                    {hasPracticeTest ? (
                        <FontAwesomeIcon icon={faCheck} fontSize="1.2rem" />
                    ) : (
                        <FontAwesomeIcon icon={faPencil} fontSize="1.2rem" />
                    )}
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
                                            checked={selectedLanguages?.includes('en')}
                                            onChange={handleLanguageCheckedList}
                                            value={'en'}
                                        />
                                        English
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages?.includes('es')}
                                            onChange={handleLanguageCheckedList}
                                            value="es"
                                        />
                                        Español
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages?.includes('tr')}
                                            onChange={handleLanguageCheckedList}
                                            value="tr"
                                        />
                                        Türkçe
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages?.includes('pt')}
                                            onChange={handleLanguageCheckedList}
                                            value="pt"
                                        />
                                        Português
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages?.includes('ar')}
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
                                            checked={selectedRating === 4.5}
                                            onChange={() => dispatch(setRating(4.5))}
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
                                            checked={selectedRating === 4}
                                            onChange={() => dispatch(setRating(4))}
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
                                            checked={selectedRating === 3.5}
                                            onChange={() => dispatch(setRating(3.5))}
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
                                            checked={selectedRating === 3}
                                            onChange={() => dispatch(setRating(3))}
                                            value={3}
                                        />
                                        <span>
                                            <StarRating rating={3} isPreventDefault={false} />
                                            3.0 &amp; up
                                        </span>
                                    </label>
                                </li>
                            </ul>
                            {selectedRating && (
                                <div className={cx('rating-clear-btn')} onClick={() => dispatch(clearRating())}>
                                    <FontAwesomeIcon fontSize="1.2rem" icon={faXmark} />
                                    Clear filter
                                </div>
                            )}
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
                                            checked={selectedLevel?.includes('all')}
                                            onChange={handleLevelCheckedList}
                                            value="all"
                                        />
                                        All Levels
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevel?.includes('beginner')}
                                            onChange={handleLevelCheckedList}
                                            value="beginner"
                                        />
                                        Beginner
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevel?.includes('intermediate')}
                                            onChange={handleLevelCheckedList}
                                            value="intermediate"
                                        />
                                        Intermediate
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevel?.includes('expert')}
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
                <select
                    className={cx('mode-select')}
                    value={selectedSortMode}
                    onChange={(e) => setSelectedSortMode(e.target.value as SortMode)}
                >
                    {orderSortMode.map((item, idx) => (
                        <option className={cx('select-option')} key={idx} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <div className={cx('sort-mode-icon-wrapper')}>
                    <FontAwesomeIcon fontSize="1rem" icon={faChevronDown} />
                </div>
            </div>
        </div>
    );
}

export default SearchFiltersBar;
