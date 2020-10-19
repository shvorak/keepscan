import { useMediaQuery } from 'react-responsive'
import { useMemo } from 'react'

const MEDIA_SIZES = {
    mobile: '400px',
    tablet: '600px',
    tabletXL: '1024px',
    desktop: '1280px',
}

const MEDIA_QUERIES = {
    mobile: `(max-width: ${MEDIA_SIZES.mobile})`,
    tablet: `(max-width: ${MEDIA_SIZES.tablet})`,
    tabletXL: `(max-width: ${MEDIA_SIZES.tabletXL})`,
    desktop: `(min-width: ${MEDIA_SIZES.desktop})`,
}

type Sizes = keyof typeof MEDIA_QUERIES

export const useMedia = (...names: Sizes[]) => {
    const query = useMemo(
        () =>
            names
                .map((x) => MEDIA_QUERIES[x])
                .filter(Boolean)
                .join(', '),
        [names]
    )

    return useMediaQuery({query})
}
