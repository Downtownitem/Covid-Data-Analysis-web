import { Button, Checkbox, Input } from "@nextui-org/react";
import Particles from "../@/components/magicui/particles";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { blurAnimationVariants } from "./animations/variations";
import axios from "axios";
import { apiUrl } from "./requests/values";
import { confirmAuth } from "./requests/auth";


export default function Login() {
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const data: FormData = new FormData();
    data.append("username", usernameField.current?.value || "");
    data.append("password", passwordField.current?.value || "");
    const loginResponse = axios.post(`${apiUrl}/users/login`, data);

    loginResponse
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.access_token}`);
        navigate("/initial");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    confirmAuth().then((response) => {
      if (response) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <>
      <section className="bg-mybackground relative h-screen overflow-hidden flex justify-center items-center">
        {/* <Particles */}
        <Particles
          className="absolute w-full h-full inset-0"
          quantity={70}
          ease={70}
          color={"#ffffff"}
          refresh
        />

        {/* Exit animation */}
        <motion.div
          className="absolute w-full"
          initial={{ opacity: 1, bottom: "auto", top: "-75vh" }}
          animate={{
            opacity: 1,
            bottom: "-101vh",
            top: "auto",
            transition: { duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 1,
            bottom: "auto",
            top: "-75vh",
            transition: { delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <img className="w-full" src="/waves.svg" alt="Waves" />
          <div className="bg-white w-full h-[101vh] -translate-y-[0.5vh]" />
        </motion.div>

        {/* Login */}
        <div className="flex flex-col items-center gap-10 w-80">
          <motion.img
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1.4}
            variants={blurAnimationVariants}
            className="w-24"
            src="/logo.png"
            alt="Logo"
          />

          <motion.h1
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1.5}
            variants={blurAnimationVariants}
            className="text-center text-white text-4xl font-semibold"
          >
            Sign in
          </motion.h1>

          <div className="flex flex-col justify-center gap-7 w-80">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1.6}
              variants={blurAnimationVariants}
            >
              <Input
                isDisabled={loading}
                isInvalid={error && !loading}
                onFocus={() => setError(false)}
                className="bg-white/10"
                label="Username"
                radius="lg"
                size="sm"
                classNames={{
                  label:
                    "text-white/70 group-data-[focus=true]:!text-white/70 transition-all duration-300 group-data-[focus=true]:bg-transparent hover:!bg-transparent !transition-transform !duration-300",
                  input: "!text-white transition-all duration-300",
                  base: "!bg-white/10 backdrop-blur-md rounded-2xl group-data-[focus=true]:bg-white/10 hover:!bg-white/10",
                  inputWrapper:
                    "bg-transparent group-data-[focus=true]:bg-transparent hover:!bg-transparent",
                  innerWrapper:
                    "bg-transparent group-data-[focus=true]:bg-transparent hover:!bg-transparent",
                }}
                type={"text"}
                ref={usernameField}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1.7}
              variants={blurAnimationVariants}
            >
              <Input
                isDisabled={loading}
                isInvalid={error && !loading}
                onFocus={() => setError(false)}
                className="bg-white/10"
                label="Password"
                radius="lg"
                size="sm"
                classNames={{
                  label:
                    "text-white/70 group-data-[focus=true]:!text-white/70 transition-all duration-300 group-data-[focus=true]:bg-transparent hover:!bg-transparent !transition-transform !duration-300",
                  input: "!text-white transition-all duration-300",
                  base: "!bg-white/10 backdrop-blur-md rounded-2xl group-data-[focus=true]:bg-white/10 hover:!bg-white/10",
                  inputWrapper:
                    "bg-transparent group-data-[focus=true]:bg-transparent hover:!bg-transparent",
                  innerWrapper:
                    "bg-transparent group-data-[focus=true]:bg-transparent hover:!bg-transparent",
                }}
                type="password"
                ref={passwordField}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1.8}
              variants={blurAnimationVariants}
              className="flex items-center justify-between"
            >
              <Checkbox
                classNames={{ label: "text-white text-sm" }}
                color="primary"
                size="sm"
                defaultSelected
              >
                Remember me
              </Checkbox>
              <Link className="text-primary text-sm" to="/">
                Forget password?
              </Link>
            </motion.div>
            <motion.div
              className="w-full flex flex-col items-center gap-1"
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1.9}
              variants={blurAnimationVariants}
            >
              <Button
                onClick={handleLogin}
                color="primary"
                className="text-white hover:-translate-y-1 !transition-transform !duration-500 w-full"
                isLoading={loading}
              >
                Login
              </Button>
              <Link to="/register" className="cursor-pointer text-white">
                Still don't have an account? Sign up
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
