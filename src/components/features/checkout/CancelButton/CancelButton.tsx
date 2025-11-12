'use client';

import { useRouter } from 'next/navigation';

import FlexibleButton from '~/components/ui/FlexibleButton';

function CancelButton() {
    const router = useRouter();

    return (
        <FlexibleButton
            onClick={() => router.back()}
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
