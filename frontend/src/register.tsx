import { Button, Input } from "@nextui-org/react";
import Particles from "../@/components/magicui/particles";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { blurAnimationVariants } from "./animations/variations";
import axios from "axios";
import { apiUrl } from "./requests/values";

export default function Register() {
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const confirmPasswordField = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (
      !usernameField.current?.value ||
      !passwordField.current?.value ||
      !nameField.current?.value ||
      !confirmPasswordField.current?.value
    ) {
      setError(true);
      return;
    }

    if (passwordField.current?.value !== confirmPasswordField.current?.value) {
      setError(true);
      return;
    }

    setLoading(true);
    const loginResponse = axios.post(`${apiUrl}/users/register`, {
      username: usernameField.current?.value,
      password: passwordField.current?.value,
      name: nameField.current?.value,
    });

    loginResponse
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.access_token}`);
        navigate("/dashboard");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          <div className="bg-white w-full h-[101vh] -translate-y-1" />
        </motion.div>

        {/* Register */}
        <div className="flex flex-col items-center gap-10 w-80">
          <motion.h1
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1.5}
            variants={blurAnimationVariants}
            className="text-center text-white text-4xl font-semibold"
          >
            Sign up
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
                label="Name"
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
                ref={nameField}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1.8}
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
              custom={1.9}
              variants={blurAnimationVariants}
            >
              <Input
                isDisabled={loading}
                isInvalid={error && !loading}
                onFocus={() => setError(false)}
                className="bg-white/10"
                label=" Confirm Password"
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
                ref={confirmPasswordField}
              />
            </motion.div>

            <motion.div
              className="w-full flex flex-col items-center gap-1"
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={2}
              variants={blurAnimationVariants}
            >
              <Button
                onClick={handleLogin}
                color="primary"
                className="text-white hover:-translate-y-1 !transition-transform !duration-500 w-full"
                isLoading={loading}
              >
                Sign up
              </Button>
              <Link to="/" className="cursor-pointer text-white">
                Already have an account? Sign in
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
