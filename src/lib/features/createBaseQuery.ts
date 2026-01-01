import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../getBaseUrl';
// import { RootState } from '../store';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type MyBaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const createBaseQuery = (): MyBaseQueryFn => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: getBaseUrl(),

        credentials: 'include', // nếu dùng cookie

        // chuẩn bị headers trước khi gửi request
        prepareHeaders: (headers, api) => {
            // ví dụ: lấy token từ store
            // const token = (api.getState() as RootState).auth.token;
            const token = 'example-token-123';
            // const locale = (api.getState() as RootState).settings.locale ?? 'en';
            const locale = 'en';

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('X-Locale', locale);
            headers.set('X-Client', 'web');
            headers.set('X-version', '1.0.0');

            return headers;
        },

        // responseHandler: undefined, // mặc định json()
        responseHandler: async (response) => {
            // ví dụ: đọc json
            const data = await response.json();

            // bạn có thể xử lý normalize trước khi trả về
            return data;
        },
    });

    // bọc thêm middleware error-handling
    const baseQuery: MyBaseQueryFn = async (args, api, extraOptions) => {
        try {
            let result = await rawBaseQuery(args, api, extraOptions);

            // Retry với Backoff

            const shouldRetry = (err: FetchBaseQueryError | undefined) =>
                (err && err.status === 'FETCH_ERROR') || (typeof err?.status === 'number' && err.status >= 500);

            let retries = 0;
            while ('error' in result && shouldRetry(result.error) && retries < 3) {
                retries++;
                const delay = 300 * 2 ** (retries - 1);
                await sleep(delay);

                result = await rawBaseQuery(args, api, extraOptions);
            }

            if ('error' in result && result.error) {
                // Handle từng loại lỗi
                switch (result.error.status) {
                    case 400:
                        console.warn('Bad request', result.error);
                        break;

                    case 401:
                        const refreshResult = await rawBaseQuery(
                            { url: '/auth/refresh', method: 'POST' },
                            api,
                            extraOptions,
                        );

                        if ('data' in refreshResult) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const newToken = (refreshResult.data as any)?.accessToken;

                            // cập nhật vào store
                            api.dispatch({
                                type: 'auth/setToken',
                                payload: newToken,
                            });
                            // api.dispatch(setToken(newToken));

                            // gắn lại header cho request cũ
                            const newArgs =
                                typeof args === 'string'
                                    ? { url: args }
                                    : {
                                          ...args,
                                          headers: { ...(args.headers || {}), authorization: `Bearer ${newToken}` },
                                      };

                            // retry lại request ban đầu
                            result = await rawBaseQuery(newArgs, api, extraOptions);
                        } else {
                            console.warn('Unauthorized - logging out...');
                            // api.dispatch(logout());
                        }

                        break;
                    case 403:
                        console.warn('Forbidden');
                        break;

                    case 404:
                        console.warn('Not found');
                        break;

                    case 500:
                        console.error('Server error', result.error);
                        break;

                    case 'FETCH_ERROR':
                        console.error('Network error', result.error);
                        break;

                    case 'PARSING_ERROR':
                        console.error('JSON parse error', result.error);
                        break;

                    case 'CUSTOM_ERROR':
                        console.error('Custom error', result.error);
                        break;
                }

                return result;
            }

            return {
                data: result.data,
                meta: result.meta,
            };
        } catch (e) {
            const customError: FetchBaseQueryError = {
                status: 'CUSTOM_ERROR',
                error: e instanceof Error ? e.message : 'Unknown custom error',
            };

            return { error: customError };
        }
    };

    return baseQuery;
};
