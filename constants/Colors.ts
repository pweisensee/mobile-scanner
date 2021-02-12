const primary = '#2f95dc';

const Pallette: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    warningBg: string;
} = {
    background: '#fff',
    primary: primary,
    card: primary,
    text: '#525252',
    border: primary,
    notification: primary,
    warningBg: 'rgba(220, 24, 24, 0.83)',
};

// Note we're not implementing "dark" theming for this app because it's a demo
const Colors = { light: Pallette, dark: Pallette };

export default Colors;
