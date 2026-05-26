
import { Transition, TargetAndTransition, Easing, Variants } from 'framer-motion';

export const headerIconHoverRotate: Variants = {
  whileHover: { rotate: 15, transition: { duration: 0.3 } }
};
export const headerLabelFade: Variants = {
  initial: { opacity: 0 },
  whileHover: { opacity: 1, transition: { duration: 0.2 } }
};
export const headerButton3DTilt: Variants = {
  whileHover: {
    rotateX: 5,
    rotateY: -5,
    transition: { duration: 0.3, ease: "easeOut" as Easing }
  }
};