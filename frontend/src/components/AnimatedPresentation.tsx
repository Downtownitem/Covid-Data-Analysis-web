import {motion} from "framer-motion";

export default function AnimatedPresentation() {
    return (
        <>
            <div>
                <motion.h1
                    initial={{y: -20, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                    viewport={{once: true, amount: 0}}
                    className="text-4xl text-white font-bold"
                >
                    Hello, I'm Daniel
                </motion.h1>
                <motion.span className="text-lg text-white">A full-stack developer focused in AI</motion.span>
            </div>
        </>
    );
}
