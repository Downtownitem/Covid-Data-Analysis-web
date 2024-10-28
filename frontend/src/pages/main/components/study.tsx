import { motion } from "framer-motion";
import { blurAnimationVariants } from "../../../animations/variations";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import axios from "axios";
import { apiUrl } from "../../../requests/values";

export default function Study() {
  const [confirmed, setconfirmed] = useState("0");
  const [deaths, setdeaths] = useState("0");
  const [recovered, setrecovered] = useState("0");
  const [active, setactive] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/graphs/total_stats`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setconfirmed(response.data.confirmed);
        setdeaths(response.data.deaths);
        setrecovered(response.data.recovered);
        setactive(response.data.active);
        setIsLoading(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        custom={0}
        variants={blurAnimationVariants}
        className="bg-[url('/fondo.png')] bg-no-repeat bg-cover rounded-3xl relative p-5 w-full shadow-md"
      >
        <div className="mb-7 mt-2">
          <motion.h1
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={0.3}
            variants={blurAnimationVariants}
            className="font-bold text-xl"
          >
            Covid Analysis
          </motion.h1>
          <motion.span
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={0.6}
            className="font-light text-sm text-black/70"
          >
            All the data of a covid dataset
          </motion.span>
        </div>
        <div className="flex gap-5 justify-between">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1}
            className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow shadow-md"
          >
            <Skeleton className="rounded-xl" isLoaded={isLoading}>
              <h1 className="font-bold text-3xl w-full">{confirmed}</h1>
            </Skeleton>
            <span className="font-light text-sm text-black/70">
              Confirmed Cases
            </span>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1.2}
            className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow shadow-md"
          >
            <Skeleton className="rounded-xl" isLoaded={isLoading}>
              <h1 className="font-bold text-3xl w-full">{deaths}</h1>
            </Skeleton>
            <span className="font-light text-sm text-black/70">Deaths</span>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1.5}
            className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow shadow-md"
          >
            <Skeleton className="rounded-xl" isLoaded={isLoading}>
              <h1 className="font-bold text-3xl w-full">{recovered}</h1>
            </Skeleton>
            <span className="font-light text-sm text-black/70">Recovered</span>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1.8}
            className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow shadow-md"
          >
            <Skeleton className="rounded-xl" isLoaded={isLoading}>
              <h1 className="font-bold text-3xl w-full">{active}</h1>
            </Skeleton>
            <span className="font-light text-sm text-black/70">Active</span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
