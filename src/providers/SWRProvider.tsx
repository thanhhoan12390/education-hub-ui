'use client';

import { SWRConfig } from 'swr';
import axiosClient from '~/lib/axiosClient';

interface SWRProviderProps {
    children: React.ReactNode;
}

function SWRProvider({ children }: SWRProviderProps) {
    return (
        <SWRConfig
            value={{
                fetcher: (key: string | [string, Record<string, string | number>?]) => {
                    // Nếu key là mảng -> giải mảng
                    if (Array.isArray(key)) {
                        const [url, params] = key;
                        return axiosClient.get(url, { params }).then((res) => res.data);
                    }

                    // Nếu key là chuỗi -> xử lý bình thường
                    return axiosClient.get(key).then((res) => res.data);
                },
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default SWRProvider;
