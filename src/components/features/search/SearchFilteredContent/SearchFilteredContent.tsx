'use client';

import { Flex, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

import { useGetCoursesQuery } from '~/lib/features/course/courseApiSlice';
import SearchCard from '~/components/ui/SearchCard';
import { useCourseParams } from '~/hooks/useCourseParams';
import styles from './SearchFilteredContent.module.css';

function SearchFilteredContent() {
    const coursesParams = useCourseParams();

    const {
        data: courses,
        error,
        isError,
        isFetching,
    } = useGetCoursesQuery(coursesParams, {
        refetchOnMountOrArgChange: true,
    });

    if (isError || error) return <h4 style={{ textAlign: 'center' }}>Somethings went wrong</h4>;
    if (isFetching)
        return (
            <div className={`${styles.loadingOverlay} ${isFetching ? styles.loadingOverlayOpen : ''}`}>
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
            </div>
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
