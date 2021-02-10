import { Theme as ThemeType } from '@react-navigation/native/lib/typescript/src/types';
import Colors from './Colors';

const Theme = {
    dark: false, // we've disabled "dark" theming for this app because it's a demo
    colors: Colors,
    Icon: { color: Colors.light.primary },
    Button: { color: Colors.light.primary },
};

export default Theme;
