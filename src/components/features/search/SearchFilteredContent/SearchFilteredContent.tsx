'use client';

import { useSearchParams } from 'next/navigation';
import { Flex, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

import { useGetCoursesQuery } from '~/lib/features/course/courseApiSlice';
import SearchCard from '~/components/ui/SearchCard';
import { Language, Level, Rating } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';
import OverlayModal from '~/components/ui/OverlayModal';
import styles from './SearchFilteredContent.module.css';

function SearchFilteredContent() {
    const searchParams = useSearchParams();

    const {
        data: courses,
        error,
        isError,
        isFetching,
    } = useGetCoursesQuery(
        {
            language: searchParams.getAll('language') as Language[],
            level: searchParams.getAll('level') as Level[],
            rating: Number(searchParams.get('rating')) as Rating,
            hasExercises: searchParams.get('hasExercises') === 'true' || undefined,
            hasPracticeTest: searchParams.get('hasPracticeTest') === 'true' || undefined,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    if (isError || error) return <h4>Somethings went wrong</h4>;
    if (isFetching)
        return (
            <OverlayModal open={isFetching} className={styles.loadingOverlay}>
                <Flex align="center" justify="center" gap="middle" style={{ inlineSize: '100%', minBlockSize: '100%' }}>
                    <Spin
                        indicator={
                            <Loading3QuartersOutlined
                                style={{ color: 'var(--purple-color)', fontSize: '4.8rem' }}
                                spin
                            />
                        }
                    />
                </Flex>
            </OverlayModal>
        );

    return (
        <div className={styles.wrapper}>
            <div className={styles.contentArea}>
                {courses && courses.length > 0 ? (
                    <div className={styles.cardContainer}>
                        {courses?.map((course, index) => (
                            <SearchCard key={index} course={course} />
                        ))}
                    </div>
                ) : (
                    <h4 style={{ textAlign: 'center' }}>No items match your search</h4>
                )}
            </div>
        </div>
    );
}

export default SearchFilteredContent;
