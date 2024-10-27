import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Transition(children: ReactNode) {
  return (
    <>
      {children}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-slate-900 origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-slate-900 origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
