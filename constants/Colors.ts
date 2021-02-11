const primary = '#2f95dc';

const Pallette: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
} = {
    background: '#fff',
    primary: primary,
    card: primary,
    text: '#525252',
    border: primary,
    notification: primary,
};

// Note we're not implementing "dark" theming for this app because it's a demo
const Colors = { light: Pallette, dark: Pallette };

export default Colors;
