import { AnimatePresence, motion } from "motion/react";
import { RiseFallProps } from "../../types";
import styles from "./RiseFallDiv.module.css";

export default function RiseFallDiv({ children, direction }: RiseFallProps) {
  const riseFallVariants = {
    rise: { y: 40 },
    fall: { y: -40 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        key={direction}
        initial={riseFallVariants[direction]}
        animate={{ y: 0 }}
        exit={riseFallVariants[direction]}
        transition={{ type: "spring", stiffness: 600, damping: 50 }}
        className={styles.wrapper}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
