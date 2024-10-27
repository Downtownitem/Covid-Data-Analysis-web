import {motion} from "framer-motion";

const lineVariants = {
    hidden: {pathLength: 0, opacity: 0, fill: "#ffffff00", strokeWidth: 1},
    visible: (i: number) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {delay, type: "spring", duration: 2, bounce: 0},
                opacity: {delay, duration: 0.01},
            },
        };
    },
};

const fillVariants = {
    hidden: {pathLength: 0, opacity: 0, fillOpacity: 0},
    visible: (i: number) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            fillOpacity: 1,
            transition: {
                pathLength: {delay, type: "spring", duration: 1.3, bounce: 0},
                opacity: {delay, duration: 0.01},
                fillOpacity: {delay: delay + 0.2},
            },
        };
    },
};

const textVariants = {
    hidden: {
        clipPath: "circle(1px at 0px 0px)",
    },
    visible: (i: number) => {
        return {
            clipPath: `circle(320px at 0px 0px)`,
            transition: {
                delay: i * 0.5,
                type: "spring",
                duration: 1.5,
                stiffness: 20,
                restDelta: 2,
            },
        };
    },
};

export default function Branch({delay = 0}: { delay?: number }) {
    const colors = ["#0099ff", "#ff0099", "#00cc88", "#ffca28"];

    return (
        <div className="relative flex justify-center gap-4 h-[600px]">
            <motion.svg
                width={150}
                viewBox="-20 -20 110 440"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0}}
            >
                {/* Coding time props */}
                <motion.line
                    x1="0"
                    y1="20"
                    x2="0"
                    y2="400"
                    stroke={colors[0]}
                    variants={lineVariants}
                    custom={delay}
                />
                <motion.circle
                    cx="0"
                    cy="20"
                    r="7"
                    stroke={colors[0]}
                    fill={colors[0]}
                    variants={fillVariants}
                    custom={delay}
                />
                {/* First job props */}
                <motion.path
                    d="M 0 110 l 20 0 c 10 0 20 10 20 20 l 0 270"
                    stroke={colors[1]}
                    variants={lineVariants}
                    custom={delay + 0.5}
                />
                <motion.circle
                    cx="0"
                    cy="110"
                    r="7"
                    stroke={colors[1]}
                    fill={colors[1]}
                    variants={fillVariants}
                    custom={delay + 0.5}
                />
                {/* Second job props */}
                <motion.path
                    d="M 40 185 l 20 0 c 10 0 20 10 20 20 l 0 75 c 0 10 -10 20 -20 20 l -20 0"
                    stroke={colors[2]}
                    variants={lineVariants}
                    custom={delay + 1}
                />
                <motion.circle
                    cx="40"
                    cy="185"
                    r="7"
                    stroke={colors[2]}
                    fill={colors[2]}
                    variants={fillVariants}
                    custom={delay + 1}
                />
                <motion.circle
                    cx="40"
                    cy="300"
                    r="7"
                    stroke={colors[2]}
                    fill={colors[2]}
                    variants={fillVariants}
                    custom={delay + 3}
                />
                {/* Third job props */}
                <motion.path
                    d="M 40 320 l 20 0 c 10 0 20 10 20 20 l 0 60"
                    stroke={colors[3]}
                    variants={lineVariants}
                    custom={delay + 1.5}
                />
                <motion.circle
                    cx="40"
                    cy="320"
                    r="7"
                    stroke={colors[3]}
                    fill={colors[3]}
                    variants={fillVariants}
                    custom={delay + 1.5}
                />
            </motion.svg>
            <motion.section
                className="[&>div>h2]:font-bold [&>div>p]:font-light [&>div>p]:text-sm w-80 flex flex-col justify-around"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0}}
            >
                <motion.div
                    className="text-blue"
                    variants={textVariants}
                    custom={delay + 0}
                >
                    <h2>Development experience</h2>
                    <p>January 2022</p>
                </motion.div>
                <motion.div
                    className="text-red"
                    variants={textVariants}
                    custom={delay + 0.6}
                >
                    <h2>CL SMA: Compañía líder software de manejo avanzado</h2>
                    <p>Junior Fullstack developer</p>
                    <p>October 2023 - Present</p>
                </motion.div>
                <motion.div
                    className="text-green"
                    variants={textVariants}
                    custom={delay + 1.1}
                >
                    <h2>SNAU Tech Solutions</h2>
                    <p>Freelance Main Developer</p>
                    <p>January 2024 - April 2024</p>
                </motion.div>
                <motion.div
                    className="text-yellow"
                    variants={textVariants}
                    custom={delay + 1.6}
                >
                    <h2>
                        Universidad del Norte - Departamento de TIC division de Innovación
                    </h2>
                    <p>Fullstack Developer</p>
                    <p>May 2024 - Present</p>
                </motion.div>
            </motion.section>
        </div>
    );
}
