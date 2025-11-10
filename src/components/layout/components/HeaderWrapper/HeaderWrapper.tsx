// import { headers } from 'next/headers';
// import { use } from 'react';

// import Header from '../Header';

// // dùng cookies(), headers() sẽ làm route trở thành dynamic
// // → Next.js sẽ hiểu rằng trang cần chạy ở runtime (dynamic) vì cookies/headers chỉ có trong request thật.
// function HeaderWrapper() {
//     const headersList = use(headers());

//     const pathname = headersList.get('x-current-path') || '/';

//     const isHome = pathname === '/';

//     return <Header showShadow={!isHome} />;
// }

// export default HeaderWrapper;

'use client';

import { usePathname } from 'next/navigation';

function HeaderWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isHome = pathname === '/';

    return (
        <div
            style={
                isHome
                    ? {
                          position: 'relative',
                          zIndex: '99',
                          inlineSize: '100%',
                      }
                    : {
                          position: 'relative',
                          zIndex: '99',
                          boxShadow:
                              '0 2px 4px color-mix(in oklch, oklch(27.54% 0.1638 265.98deg) 8%, transparent), 0 4px 12px color-mix(in oklch, oklch(27.54% 0.1638 265.98deg) 8%, transparent)',
                          inlineSize: '100%',
                      }
            }
        >
            {children}
        </div>
    );
}

export default HeaderWrapper;
