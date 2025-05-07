import { BREAKPOINT } from '../constant/breakpoints';
import useMediaQuery from './useMediaQuery';

export default function useResponsiveIllustration() {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT.md}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${BREAKPOINT.md + 1}px) and (max-width: ${BREAKPOINT.lg}px)`,
  );

  if (isMobile) {
    return {
      src: '/images/landing/illustration/mobile.png',
      width: 287,
      height: 168,
    };
  } else if (isTablet) {
    return {
      src: '/images/landing/illustration/tablet.png',
      width: 537,
      height: 314,
    };
  } else {
    return {
      src: '/images/landing/illustration/desktop.png',
      width: 722,
      height: 422,
    };
  }
}
