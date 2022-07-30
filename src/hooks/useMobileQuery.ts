import { useMediaQuery } from '@material-ui/core';
import { MIN_DESKTOP_WIDTH } from '../config';

const useMobileQuery = () =>
  useMediaQuery(`(max-width:${MIN_DESKTOP_WIDTH}px)`);

export default useMobileQuery;
