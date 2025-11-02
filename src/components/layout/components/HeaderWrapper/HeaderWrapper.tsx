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
import Header from '../Header';

function HeaderWrapper() {
    const pathname = usePathname();

    const isHome = pathname === '/';

    return <Header showShadow={!isHome} />;
}

export default HeaderWrapper;
