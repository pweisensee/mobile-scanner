import { createTheme } from '@rneui/themed';
import Colors from './Colors';

const Theme = createTheme({
    lightColors: Colors.light,
    darkColors: Colors.dark,
    mode: 'light',
    components: {
        Icon: { color: Colors.light.primary },
        Button: { buttonStyle: { backgroundColor: Colors.light.primary } },
        Text: { style: { color: Colors.light.text } },
        ListItemTitle: { style: { color: Colors.light.text } },
    },
});

export default Theme;
