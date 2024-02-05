// animation.jsx
export const pageEffect = {
    initial: {
        opacity: 0,
        x: '100vw'
    },
    in: {
        opacity: 1,
        x: '0vw',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.6
        }
    },
    out: {
        opacity: 0,
        x: '-100vw',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.6
        }
    }
};
