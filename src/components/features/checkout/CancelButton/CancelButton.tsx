'use client';

import { usePathname } from 'next/navigation';

import FlexibleButton from '~/components/ui/FlexibleButton';

function CancelButton() {
    const pathName = usePathname();

    const isBackToCart = pathName === '/checkout'; //cách tạm thời
    const backUrl = isBackToCart ? '/cart' : `/view-course/${pathName.split('/').pop()}`;

    return (
        <FlexibleButton
            onClick={
                () => (window.location.href = backUrl) // sẽ reload hoàn toàn CSS và layout.
            }
            style={{
                inlineSize: 'unset',
                minInlineSize: 'unset',
                paddingInline: '0.4rem',
                marginInline: '-0.4rem',
            }}
            hover
            large
        >
            Cancel
        </FlexibleButton>
    );
}

export default CancelButton;
