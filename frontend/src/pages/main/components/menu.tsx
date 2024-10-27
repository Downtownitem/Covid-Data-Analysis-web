import { motion } from "framer-motion";
import { menuItems } from "./menulogic";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "react";
import { blurAnimationVariants } from "../../../animations/variations";

export default function Menu({ changer }: { changer: Dispatch<string> }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(link: string, name: string) {
    changer(name);
    navigate("/dashboard" + link);
  }

  return (
    <>
      <section className="bg-[#FFFFFF] row-span-2 col-start-1 row-start-1">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={blurAnimationVariants}
          custom={0}
          className="h-[70px] flex gap-3 items-center pl-8"
        >
          <img className="h-9" src="/logo.png" alt="Logo" />
          <h1 className="text-[19px] font-black text-black">Covid 19</h1>
        </motion.div>

        <div className="p-3 py-6 flex flex-col gap-4">
          {menuItems.map((category, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <motion.h2
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={blurAnimationVariants}
                custom={0.3}
                className="text-sm font-bold text-[#525252] ml-6"
              >
                {category.title}
              </motion.h2>
              <ul className="flex flex-col gap-[2px] cursor-pointer">
                {category.items.map((item, index) => (
                  <motion.li
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={blurAnimationVariants}
                    custom={0.3 * index + 0.6}
                    key={index}
                    onClick={() => handleClick(item.link, item.title)}
                    className={`flex gap-[7px] pl-6 py-[6px] rounded-lg ${
                      location.pathname.endsWith(item.link)
                        ? "bg-[#ececec]"
                        : "hover:bg-[#f7f8fa]"
                    }`}
                  >
                    <svg
                      className={`h-[19px] w-[19px] ${
                        location.pathname.endsWith(item.link)
                          ? "fill-primary"
                          : "fill-[#7e7e7e]"
                      }`}
                      viewBox="0 0 48 48"
                    >
                      <path d={item.icon} />
                    </svg>
                    <p
                      className={`text-sm ${
                        location.pathname.endsWith(item.link)
                          ? "text-primary font-semibold"
                          : "text-[#7e7e7e] font-light hover:text-[#636363]"
                      }`}
                    >
                      {item.title}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
