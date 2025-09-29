import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export function HeroHighlightDemo({toHighlight}: {toHighlight: string}) {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <Highlight className="text-black dark:text-white">
          {toHighlight}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
