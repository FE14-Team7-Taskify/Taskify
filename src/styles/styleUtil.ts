export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const cond = (cond: boolean, className: string) => (cond ? className : '');
