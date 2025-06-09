// Em src/hooks/useThemedStyles.ts
import {useMemo} from 'react';
import {useTheme} from '../context/ThemeContext';
import {Theme} from '../theme/colors';

export const useThemedStyles = <T>(getStyles: (theme: Theme) => T): T => {
  const {theme} = useTheme();

  const styles = useMemo(() => getStyles(theme), [theme, getStyles]);

  return styles;
};
