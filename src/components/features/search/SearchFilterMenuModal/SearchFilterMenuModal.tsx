'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import MenuModal from '~/components/ui/MenuModal';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { ListIcon } from '~/components/ui/Icons';
import CustomRadio from '~/components/ui/CustomRadio';
import StarRating from '~/components/ui/StarRating';
import { Language, Level, Rating } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';
import CustomCheckbox from '~/components/ui/CustomCheckbox';
import { useCoursesStatus } from '~/hooks/useCoursesStatus';
import styles from './SearchFilterMenuModal.module.css';

interface SearchFilterMenuModalProps {
    selectedRating: Rating | null;
    onRatingChange: (r: Rating | null) => void;
    selectedLevels: Level[];
    onLevelCheckedListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasExercises: true | undefined;
    onHasExerciseChange: () => void;
    hasPracticeTest: true | undefined;
    onHasPracticeTestChange: () => void;
    selectedLanguages: Language[];
    onLanguageCheckedListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearAllFilters: () => void;
}

function SearchFilterMenuModal({
    selectedRating,
    onRatingChange,
    selectedLevels,
    onLevelCheckedListChange,
    hasExercises,
    onHasExerciseChange,
    hasPracticeTest,
    onHasPracticeTestChange,
    selectedLanguages,
    onLanguageCheckedListChange,
    onClearAllFilters,
}: SearchFilterMenuModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { isLoading } = useCoursesStatus();

    console.log(isLoading);

    return (
        <>
            <FlexibleButton outline rounded className={styles.searchStyleBtn} onClick={() => setIsOpen(true)}>
                <ListIcon height="1.6rem" width="1.6rem" />
                <span>All filters</span>
            </FlexibleButton>

            <MenuModal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className={`${styles.drawerContent} ${isLoading ? styles.drawerContentLoading : ''}`}>
                    <div className={styles.drawerHeader}>
                        <span className={styles.drawerHeading}>Filters</span>

                        {(!!selectedRating ||
                            selectedLanguages.length > 0 ||
                            selectedLevels.length > 0 ||
                            hasExercises ||
                            hasPracticeTest) && (
                            <FlexibleButton onClick={onClearAllFilters} className={styles.clearFiltersBtn}>
                                <FontAwesomeIcon
                                    style={{ fontSize: '1.4rem', marginInlineEnd: '0.4rem' }}
                                    icon={faXmark}
                                />
                                Clear all filters
                            </FlexibleButton>
                        )}
                    </div>
                    <div className={styles.drawerBody}>
                        <div className={styles.drawerFilters}>
                            <div className={styles.drawerFilterGroup}>
                                <h4 className={styles.filterGroupHeading}>Ratings</h4>
                                <ul className={styles.checklist}>
                                    <li>
                                        <label className={`${styles.checklistItem} ${styles.ratingItem}`}>
                                            <CustomRadio
                                                checked={selectedRating === 4.5}
                                                onChange={() => onRatingChange(4.5)}
                                                value={4.5}
                                            />
                                            <span>
                                                <StarRating rating={4.5} isPreventDefault={false} />
                                                4.5 &amp; up
                                            </span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem} ${styles.ratingItem}`}>
                                            <CustomRadio
                                                checked={selectedRating === 4}
                                                onChange={() => onRatingChange(4)}
                                                value={4}
                                            />
                                            <span>
                                                <StarRating rating={4} isPreventDefault={false} />
                                                4.0 &amp; up
                                            </span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem} ${styles.ratingItem}`}>
                                            <CustomRadio
                                                checked={selectedRating === 3.5}
                                                onChange={() => onRatingChange(3.5)}
                                                value={3.5}
                                            />
                                            <span>
                                                <StarRating rating={3.5} isPreventDefault={false} />
                                                3.5 &amp; up
                                            </span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem} ${styles.ratingItem}`}>
                                            <CustomRadio
                                                checked={selectedRating === 3}
                                                onChange={() => onRatingChange(3)}
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

                            <div className={styles.drawerFilterGroup}>
                                <h4 className={styles.filterGroupHeading}>Level</h4>
                                <ul className={styles.checklist}>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLevels.includes('all')}
                                                onChange={onLevelCheckedListChange}
                                                value="all"
                                            />
                                            All Levels
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLevels.includes('beginner')}
                                                onChange={onLevelCheckedListChange}
                                                value="beginner"
                                            />
                                            Beginner
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLevels.includes('intermediate')}
                                                onChange={onLevelCheckedListChange}
                                                value="intermediate"
                                            />
                                            Intermediate
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLevels.includes('expert')}
                                                onChange={onLevelCheckedListChange}
                                                value="expert"
                                            />
                                            Expert
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.drawerFilterGroup}>
                                <h4 className={styles.filterGroupHeading}>Hands-on Practice</h4>

                                <ul className={styles.checklist}>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={!!hasExercises}
                                                onChange={() => onHasExerciseChange()}
                                            />
                                            Coding Exercises
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={!!hasPracticeTest}
                                                onChange={() => onHasPracticeTestChange()}
                                            />
                                            Practice Tests
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.drawerFilterGroup}>
                                <h4 className={styles.filterGroupHeading}>Language</h4>
                                <ul className={styles.checklist}>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLanguages.includes('en')}
                                                onChange={onLanguageCheckedListChange}
                                                value={'en'}
                                            />
                                            English
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLanguages.includes('es')}
                                                onChange={onLanguageCheckedListChange}
                                                value="es"
                                            />
                                            Español
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLanguages.includes('tr')}
                                                onChange={onLanguageCheckedListChange}
                                                value="tr"
                                            />
                                            Türkçe
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLanguages.includes('pt')}
                                                onChange={onLanguageCheckedListChange}
                                                value="pt"
                                            />
                                            Português
                                        </label>
                                    </li>
                                    <li>
                                        <label className={`${styles.checklistItem}`}>
                                            <CustomCheckbox
                                                checked={selectedLanguages.includes('ar')}
                                                onChange={onLanguageCheckedListChange}
                                                value="ar"
                                            />
                                            العربية
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </MenuModal>
        </>
    );
}

export default SearchFilterMenuModal;
