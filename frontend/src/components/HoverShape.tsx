import {useState} from "react";
import {motion} from "framer-motion";

const upload: string = "M23.978516 11.5 A 1.50015 1.50015 0 0 0 22.939453 11.939453L3.4394531 31.439453 A 1.50015 1.50015 0 1 0 5.5605469 33.560547L24 15.121094L42.439453 33.560547 A 1.50015 1.50015 0 1 0 44.560547 31.439453L25.060547 11.939453 A 1.50015 1.50015 0 0 0 23.978516 11.5 z"

const variants = {
    not_hover: {
        opacity: 0
    },
    hover: {
        opacity: 1,
        transition: {
            type: "easeInOut",
            stiffness: 400,
            damping: 40
        }
    }
};

export function HoverShape(shape_path: string) {
    const [hover, setHover] = useState(false);

    return (
        <>
            <div
                className='size-6 relative flex justify-center items-center'
                onMouseEnter={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                <motion.div
                    className="bg-white/40 blur rounded-full absolute w-full h-full"
                    initial="not_hover"
                    animate={hover ? "hover" : "not_hover"}
                    variants={variants}
                />
                <svg
                    className="absolute cursor-pointer size-6"
                    width="144"
                    height="144"
                    viewBox="0 0 48 48"
                    fill={'#FFFFFF'}
                >
                    <path d={shape_path}/>
                </svg>
            </div>
        </>
    );
}
