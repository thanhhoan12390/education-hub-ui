'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';
import { useEffect, useRef } from 'react';

import type { AppStore } from '~/lib/store';
import { makeStore } from '~/lib/store';

function StoreProvider({ children }: { readonly children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (storeRef.current !== null) {
            // configure listeners using the provided defaults
            // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
