import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blurAnimationVariants } from "../animations/variations";

export default function InitialAnimation() {
  const navigate = useNavigate();
  const text =
    "This website aims to present Covid-19 data visually and interactively, making it easy for users to understand trends and patterns. It serves as an intuitive, reliable tool for quick access to large data volumes, empowering informed decision-making in a changing information environment.";

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 6000);
  }, []);

  return (
    <>
      <section className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-wrap max-w-7xl justify-center gap-3">
          {text.split(" ").map((word, index) => (
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={0.1 * index}
              variants={blurAnimationVariants}
              className="text-3xl text-black font-light leading-7"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </section>
    </>
  );
}
