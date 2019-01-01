
/******************
 * Modification des couleurs directement dans ce fichier
 ******************/

const hexToRgb = (hex) => {
    const bigint = parseInt(hex.substring(1, hex.length), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
};

export const PRIMARY_COLOR = '#5E04D3';
export const PRIMARY_COLOR_TRANSPARENT = `rgba(${hexToRgb(PRIMARY_COLOR)}, 0.25)`;

export const SECONDARY_COLOR =  '#EA8A1A';
export const SECONDARY_COLOR_TRANSPARENT =  `rgba(${hexToRgb(SECONDARY_COLOR)}, 0.25)`;

export const PRIMARY_BUBBLE_GRADIENT_COLOR = '#C86DD7';
export const SECONDARY_BUBBLE_GRADIENT_COLOR = `rgba(${hexToRgb('#3023AE')}, 0.25)`;