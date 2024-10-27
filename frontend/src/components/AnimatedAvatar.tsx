import {motion} from "framer-motion";
import {Avatar} from "@nextui-org/react";

export default function AnimatedAvatar() {
    return (
        <>
            <div className="w-72 h-72 relative flex justify-center items-center [&>div]:backdrop-blur-3xl">
                <div className="w-full h-full bg-white/30 blur-3xl rounded-full absolute"/>
                <motion.div
                    className="w-56 h-56 bg-white/40 border-white rounded-[40px] absolute shadow-lg"
                    animate={{
                        rotate: [90, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0,
                    }}
                />
                <motion.div
                    className="w-56 h-56 bg-white/40 border-white rounded-[70px] absolute shadow-lg"
                    animate={{
                        rotate: [40, 130],
                    }}
                    transition={{
                        duration: 2.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0,
                    }}
                />
                <Avatar
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    className="w-56 h-56 text-large"
                    classNames={{base: "shadow-lg"}}
                />
            </div>
        </>
    );
}
