import { Route, Routes, useNavigate } from "react-router-dom";
import Menu from "./components/menu";
import { MenuContext, MenuData } from "./context";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Index from "..";
import { blurAnimationVariants } from "../../animations/variations";
import TotalPercentage from "../totalpercentage";
import LatitudeLongitude from "../latitudelongitud";
import Country from "../country";
import Territory from "../territory";
import About from "../about";

export default function Main() {
  const navigate = useNavigate();
  const [actualMenuName, setActualMenuName] = useState("Dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <MenuContext.Provider value={{ actualPage: "Dashboard" } as MenuData}>
        <section className="bg-white relative h-screen overflow-hidden grid grid-cols-[230px_calc(100%-230px)] grid-rows-[70px_calc(100%-70px)]">
          <Menu changer={setActualMenuName} />

          <section className="bg-white flex items-center p-4 justify-between">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={0}
              variants={blurAnimationVariants}
              className="flex items-center gap-3"
            >
              <div className="rounded-xl bg-black flex justify-center items-center size-10">
                <svg
                  className="size-6"
                  viewBox="0 0 48 48"
                  width="144"
                  height="144"
                >
                  <path
                    d="M14.058594 1.9980469 A 3 3 0 0 0 13.802734 7.984375L16.384766 13.478516C15.175841 14.35496 14.120621 15.425686 13.275391 16.658203L10.408203 14.998047 A 3 3 0 0 0 7.4121094 12 A 3 3 0 0 0 7.4121094 18 A 3 3 0 0 0 8.9082031 17.595703L11.882812 19.316406C11.320028 20.771105 11 22.346603 11 24C11 24.865563 11.088652 25.709123 11.25 26.527344L7.96875 27.677734 A 3 3 0 0 0 6.0117188 26.949219 A 3 3 0 1 0 6.0117188 32.949219 A 3 3 0 0 0 8.9570312 30.509766L12.175781 29.382812C12.912581 30.998517 13.97007 32.431795 15.267578 33.611328L12.066406 38.744141 A 3 3 0 0 0 12.025391 38.744141 A 3 3 0 0 0 12.025391 44.744141 A 3 3 0 0 0 14.642578 40.283203L17.705078 35.373047C19.570539 36.407743 21.715532 37 24 37C24.543896 37 25.077166 36.957433 25.603516 36.892578L26.640625 40.070312 A 3 3 0 0 0 28.871094 45.070312 A 3 3 0 0 0 29.492188 39.136719L28.525391 36.173828C29.448632 35.830379 30.326314 35.392949 31.136719 34.859375L35.191406 39.171875 A 3 3 0 0 0 38.060547 43.037109 A 3 3 0 0 0 38.060547 37.037109 A 3 3 0 0 0 37.378906 37.119141L33.435547 32.925781C34.991339 31.281645 36.119608 29.233846 36.650391 26.953125L39.144531 27.214844 A 3 3 0 0 0 41.888672 29.005859 A 3 3 0 0 0 41.888672 23.005859 A 3 3 0 0 0 39.470703 24.232422L36.998047 23.972656C36.993571 21.826209 36.462509 19.806202 35.537109 18.023438L39.449219 15.605469 A 3 3 0 0 0 40.867188 15.964844 A 3 3 0 0 0 40.867188 9.9648438 A 3 3 0 0 0 37.869141 13.056641L33.855469 15.537109C32.369289 13.807951 30.437221 12.480193 28.236328 11.720703L28.958984 9.4980469 A 3 3 0 0 0 28.316406 3.5683594 A 3 3 0 0 0 26.099609 8.5898438L25.294922 11.064453C24.869112 11.022362 24.436885 11 24 11C22.229179 11 20.542367 11.356923 19.003906 11.998047L16.517578 6.7109375 A 3 3 0 0 0 14.058594 1.9980469 z M 19 18C20.105 18 21 18.895 21 20C21 21.105 20.105 22 19 22C17.895 22 17 21.105 17 20C17 18.895 17.895 18 19 18 z M 29 18C30.657 18 32 19.343 32 21C32 22.657 30.657 24 29 24C27.343 24 26 22.657 26 21C26 19.343 27.343 18 29 18 z M 22.5 27C23.881 27 25 28.119 25 29.5C25 30.881 23.881 32 22.5 32C21.119 32 20 30.881 20 29.5C20 28.119 21.119 27 22.5 27 z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <p className="font-black text-sm">
                {actualMenuName.toUpperCase()}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={0.5}
              variants={blurAnimationVariants}
              className="flex items-center gap-3"
            >
              <p className="text-sm">Daniel Martinez</p>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    radius="lg"
                    size="md"
                    src=""
                    className="cursor-pointer"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={logout}
                  >
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </motion.div>
          </section>

          <motion.section
            initial={{
              backgroundColor: "#FFFFFF",
            }}
            animate={{
              backgroundColor: "#f7f8fa",
              transition: { delay: 0.5, duration: 5, ease: "easeInOut" },
            }}
            exit={{
              backgroundColor: "#FFFFFF",
              transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
            }}
            className="bg-[#f7f8fa] p-5 relative"
          >
            <Routes>
              <Route index element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/territory" element={<Territory />} />
              <Route path="/country" element={<Country />} />
              <Route
                path="/latitude-longitude"
                element={<LatitudeLongitude />}
              />
              <Route path="/total-percentage" element={<TotalPercentage />} />
            </Routes>
          </motion.section>
        </section>
      </MenuContext.Provider>
    </>
  );
}
