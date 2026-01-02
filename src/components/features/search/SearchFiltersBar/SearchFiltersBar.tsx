'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faCode, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FlexibleButton from '~/components/ui/FlexibleButton';
import ClickableDropdown from '~/components/ui/ClickableDropdown';
import CustomCheckbox from '~/components/ui/CustomCheckbox';
import CustomRadio from '~/components/ui/CustomRadio';
import StarRating from '~/components/ui/StarRating';
import SearchFilterMenuModal from '~/components/features/search/SearchFilterMenuModal';
import styles from './SearchFiltersBar.module.scss';

const cx = classNames.bind(styles);

type SortMode = 'highest-rated' | 'relevant' | 'most-reviewed' | 'newest';

export type Language = 'en' | 'es' | 'tr' | 'pt' | 'ar';
export type Level = 'all' | 'beginner' | 'intermediate' | 'expert';
export type Rating = 4.5 | 4 | 3.5 | 3;

const sortModeSelectData: { value: SortMode; label: string }[] = [
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'most-reviewed', label: 'Most Reviewed' },
    { value: 'newest', label: 'Newest' },
];

export const LANGUAGE_NAME = {
    en: 'English',
    ar: 'العربية',
    es: 'Español',
    pt: 'Português',
    tr: 'Türkçe',
} as const;

export const LANGUAGE_KEYS = Object.keys(LANGUAGE_NAME) as readonly Language[];

export const LEVEL_NAME = {
    all: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    expert: 'Expert',
} as const;

export const LEVEL_KEYS = Object.keys(LEVEL_NAME) as readonly Level[];

export const RATING_VALUES = [4.5, 4, 3.5, 3] as const;

function SearchFiltersBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const isLanguage = (v: string): v is Language => (LANGUAGE_KEYS as readonly string[]).includes(v);

    const isLevel = (v: string): v is Level => (LEVEL_KEYS as readonly string[]).includes(v);

    const isRating = (v: number): v is Rating => (RATING_VALUES as readonly number[]).includes(v);

    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(() =>
        searchParams.getAll('lang').filter(isLanguage),
    );

    const [selectedLevels, setSelectedLevels] = useState<Level[]>(() => searchParams.getAll('level').filter(isLevel));

    const [selectedRating, setSelectedRating] = useState<Rating | null>(() => {
        const r = searchParams.get('rating');
        if (!r) return null;

        const num = Number(r);
        return isRating(num) ? num : null;
    });

    const [hasExercises, setHasExercises] = useState<true | undefined>(() =>
        searchParams.get('hasExercises') === 'true' ? true : undefined,
    );

    const [hasPracticeTest, setHasPracticeTest] = useState<true | undefined>(() =>
        searchParams.get('hasPracticeTest') === 'true' ? true : undefined,
    );

    const [selectedSortMode, setSelectedSortMode] = useState<SortMode>(
        () => (searchParams.get('sort') as SortMode) || 'relevant',
    );

    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
    const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);

    /* ---------------------------
        SYNC STATE → URL
    ----------------------------*/
    useEffect(() => {
        const entries = Array.from(searchParams.entries());

        const LANG_KEY = 'lang';
        const LEVEL_KEY = 'level';

        const newEntries: [string, string][] = [];
        let insertedLang = false;
        let insertedLevel = false;

        for (const [key, value] of entries) {
            if (key === LANG_KEY && !insertedLang) {
                // chèn language đúng vị trí language đầu tiên xuất hiện
                selectedLanguages.forEach((l) => newEntries.push([LANG_KEY, l]));
                insertedLang = true;
                continue;
            }

            if (key === LEVEL_KEY && !insertedLevel) {
                // chèn level đúng vị trí level đầu tiên xuất hiện
                selectedLevels.forEach((l) => newEntries.push([LEVEL_KEY, l]));
                insertedLevel = true;
                continue;
            }

            // các bản sao language/level khác bỏ qua
            if (key === LANG_KEY || key === LEVEL_KEY) continue;

            // giữ nguyên key khác
            newEntries.push([key, value]);
        }

        // nếu ban đầu không có -> thêm cuối
        if (!insertedLang) {
            selectedLanguages.forEach((l) => newEntries.push([LANG_KEY, l]));
        }

        if (!insertedLevel) {
            selectedLevels.forEach((l) => newEntries.push([LEVEL_KEY, l]));
        }

        // ---- single-value filters ----
        const setOrRemove = (k: string, v?: string) => {
            const idx = newEntries.findIndex(([x]) => x === k);

            if (v == null) {
                if (idx !== -1) newEntries.splice(idx, 1);
            } else {
                if (idx !== -1) newEntries[idx][1] = v;
                else newEntries.push([k, v]);
            }
        };

        setOrRemove('rating', selectedRating ? String(selectedRating) : undefined);
        setOrRemove('hasExercises', hasExercises ? 'true' : undefined);
        setOrRemove('hasPracticeTest', hasPracticeTest ? 'true' : undefined);
        setOrRemove('sort', selectedSortMode);

        const next = `?${new URLSearchParams(newEntries).toString()}`;
        const curr = `?${searchParams.toString()}`;

        if (next !== curr) router.replace(next, { scroll: false });
    }, [
        selectedLanguages,
        selectedLevels,
        selectedRating,
        hasExercises,
        hasPracticeTest,
        selectedSortMode,
        searchParams,
        router,
    ]);

    const handleLanguageCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Language;
        setSelectedLanguages((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    };

    const handleLevelCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Level;
        setSelectedLevels((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    };

    const handleRatingChange = (r: Rating | null) => setSelectedRating(r);
    const handleHasExerciseChange = () => setHasExercises((prev) => (prev ? undefined : true));
    const handleHasPracticeTestChange = () => setHasPracticeTest((prev) => (prev ? undefined : true));
    const handleClearAllFilters = () => {
        setSelectedLanguages([]);
        setSelectedLevels([]);
        setSelectedRating(null);
        setHasExercises(undefined);
        setHasPracticeTest(undefined);
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
                <SearchFilterMenuModal
                    selectedRating={selectedRating}
                    onRatingChange={handleRatingChange}
                    selectedLevels={selectedLevels}
                    onLevelCheckedListChange={handleLevelCheckedList}
                    hasExercises={hasExercises}
                    onHasExerciseChange={handleHasExerciseChange}
                    hasPracticeTest={hasPracticeTest}
                    onHasPracticeTestChange={handleHasPracticeTestChange}
                    selectedLanguages={selectedLanguages}
                    onLanguageCheckedListChange={handleLanguageCheckedList}
                    onClearAllFilters={handleClearAllFilters}
                />

                <FlexibleButton
                    onClick={handleHasExerciseChange}
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
                    onClick={handleHasPracticeTestChange}
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
                                            checked={selectedLanguages.includes('en')}
                                            onChange={handleLanguageCheckedList}
                                            value={'en'}
                                        />
                                        English
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages.includes('es')}
                                            onChange={handleLanguageCheckedList}
                                            value="es"
                                        />
                                        Español
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages.includes('tr')}
                                            onChange={handleLanguageCheckedList}
                                            value="tr"
                                        />
                                        Türkçe
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages.includes('pt')}
                                            onChange={handleLanguageCheckedList}
                                            value="pt"
                                        />
                                        Português
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLanguages.includes('ar')}
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
                        {selectedLanguages.length >= 3 && <span style={{ fontWeight: '700' }}>Language</span>}
                        {selectedLanguages.length >= 1 && selectedLanguages.length <= 2 && (
                            <span style={{ fontWeight: '700' }}>
                                {selectedLanguages.map((languageKey, index) => {
                                    if (index === 0) return `${LANGUAGE_NAME[languageKey]}`;
                                    return `, ${LANGUAGE_NAME[languageKey]}`;
                                })}
                            </span>
                        )}
                        {selectedLanguages.length === 0 && <span>Language</span>}
                        {!!selectedLanguages.length && (
                            <span className={cx('selected-count')}>{selectedLanguages.length}</span>
                        )}
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
                                            onChange={() => handleRatingChange(4.5)}
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
                                            onChange={() => handleRatingChange(4)}
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
                                            onChange={() => handleRatingChange(3.5)}
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
                                            onChange={() => handleRatingChange(3)}
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
                                <div className={cx('rating-clear-btn')} onClick={() => handleRatingChange(null)}>
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
                        {!!selectedRating && (
                            <>
                                <span style={{ fontWeight: '700' }}>{`${selectedRating.toFixed(1)} & up`}</span>
                                <span className={cx('selected-count')}>1</span>
                            </>
                        )}
                        {!selectedRating && <span>Rating</span>}
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
                                            checked={selectedLevels.includes('all')}
                                            onChange={handleLevelCheckedList}
                                            value="all"
                                        />
                                        All Levels
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevels.includes('beginner')}
                                            onChange={handleLevelCheckedList}
                                            value="beginner"
                                        />
                                        Beginner
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevels.includes('intermediate')}
                                            onChange={handleLevelCheckedList}
                                            value="intermediate"
                                        />
                                        Intermediate
                                    </label>
                                </li>
                                <li>
                                    <label className={cx('checklist-item')}>
                                        <CustomCheckbox
                                            checked={selectedLevels.includes('expert')}
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
                        {selectedLevels.length >= 3 && <span style={{ fontWeight: '700' }}>Level</span>}
                        {selectedLevels.length >= 1 && selectedLevels.length <= 2 && (
                            <span style={{ fontWeight: '700' }}>
                                {selectedLevels.map((levelKey, index) => {
                                    if (index === 0) return `${LEVEL_NAME[levelKey]}`;
                                    return `, ${LEVEL_NAME[levelKey]}`;
                                })}
                            </span>
                        )}
                        {selectedLevels.length === 0 && <span>Level</span>}
                        {!!selectedLevels.length && (
                            <span className={cx('selected-count')}>{selectedLevels.length}</span>
                        )}
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
