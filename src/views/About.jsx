import React, { useContext, useState } from "react";
import { techStack, careerTimeline } from "../constants";
import { ThemeContext } from "../themeProvider";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [expandedIndex, setExpandedIndex] = useState(0);
  return (
    <div id="about" className={darkMode === true ? "bg-white" : "bg-gray-900"}>
      <div className="max-w-7xl mx-auto x-4 sm:px-6 lg:px-8 px-4 md:mt-0 pt-24 pb-12">
        <h2
          className={
            darkMode
              ? "text-5xl font-bold px-4 md:px-0 text-center"
              : "text-5xl font-bold px-4 md:px-0 text-center text-white"
          }
        >
          About Me
        </h2>
        <div>
          <motion.div>
            <h4 className="mt-12 text-3xl font-semibold text-blue-500">
              A bit about me
            </h4>
            <p
              className={
                darkMode
                  ? "mt-4 text-xl text-justify text-gray-500"
                  : "mt-4 text-xl text-justify text-white"
              }
            >
              I'm a self-taught web developer and website designers with experience in designing new
              features from ideation to production, implementation of wireframes
              and design flows into high performance software applications. I
              take into consideration the user experience while writing reusable
              and efficient code. I passionately combine good design,
              technology, and innovation in all my projects, which I like to
              accompany from the first idea to release.
            </p>
          </motion.div>
          <motion.div>
            <h4 className="mt-12 text-3xl font-semibold text-blue-500">
              Career Journey
            </h4>
            <div className="mt-12 relative">
              {/* center line (desktop) */}
              <div
                className={
                  darkMode
                    ? "hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300"
                    : "hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-600"
                }
              ></div>
              {/* left line (mobile) */}
              <div
                className={
                  darkMode
                    ? "md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"
                    : "md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"
                }
              ></div>

              <div className="space-y-10 md:space-y-4">
                {careerTimeline.map((el, index) => {
                  const isLeft = index % 2 === 0;
                  const isExpanded = expandedIndex === index;
                  return (
                    <motion.div
                      key={index}
                      initial="hidden"
                      whileInView={"visible"}
                      viewport={{ once: true }}
                      variants={{
                        visible: {
                          x: 0,
                          opacity: 1,
                          transition: { type: "spring" },
                        },
                        hidden: { opacity: 0, x: isLeft ? -40 : 40 },
                      }}
                      className="relative md:flex md:items-center md:justify-center py-4"
                    >
                      {/* dot (mobile) */}
                      <span
                        className={
                          el.current
                            ? "md:hidden absolute -left-0.5 top-6 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-200 z-10"
                            : darkMode
                            ? "md:hidden absolute -left-0.5 top-6 w-4 h-4 rounded-full bg-gray-400 z-10"
                            : "md:hidden absolute -left-0.5 top-6 w-4 h-4 rounded-full bg-gray-500 z-10"
                        }
                      ></span>
                      {/* dot (desktop, center) */}
                      <span
                        className={
                          el.current
                            ? "hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-blue-200 z-10"
                            : darkMode
                            ? "hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gray-400 z-10"
                            : "hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gray-500 z-10"
                        }
                      ></span>

                      <div
                        className={
                          isLeft
                            ? "w-full pl-10 md:pl-0 md:w-5/12 md:mr-auto"
                            : "w-full pl-10 md:pl-0 md:w-5/12 md:ml-auto"
                        }
                      >
                        <div
                          className={
                            darkMode
                              ? "rounded-xl border border-gray-200 bg-gray-50 shadow-sm hover:shadow-lg transition-shadow overflow-hidden border-l-4 " +
                                (el.current ? "border-l-blue-500" : "border-l-gray-300")
                              : "rounded-xl border border-gray-700 bg-gray-800 shadow-sm hover:shadow-lg transition-shadow overflow-hidden border-l-4 " +
                                (el.current ? "border-l-blue-500" : "border-l-gray-600")
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedIndex(isExpanded ? null : index)
                            }
                            aria-expanded={isExpanded}
                            className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 focus:outline-none"
                          >
                            <div>
                              <h5
                                className={
                                  darkMode
                                    ? "text-xl font-semibold text-gray-900"
                                    : "text-xl font-semibold text-white"
                                }
                              >
                                {el.company}
                              </h5>
                              <p
                                className={
                                  darkMode
                                    ? "text-md text-gray-500"
                                    : "text-md text-gray-300"
                                }
                              >
                                {el.role}
                              </p>
                              <p className="mt-1 text-sm text-blue-500 font-medium">
                                {el.duration}
                                {el.current && (
                                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                    Current
                                  </span>
                                )}
                              </p>
                            </div>
                            <span
                              className={
                                (darkMode
                                  ? "flex items-center gap-1 text-xs font-medium text-blue-600 "
                                  : "flex items-center gap-1 text-xs font-medium text-blue-400 ") +
                                "shrink-0 mt-1 select-none"
                              }
                            >
                              {isExpanded ? "Hide details" : "View details"}
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                              >
                                ▾
                              </motion.span>
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && el.highlights && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <ul
                                  className={
                                    darkMode
                                      ? "px-5 pb-4 pt-1 space-y-2 text-sm text-gray-600 border-t border-gray-200/70"
                                      : "px-5 pb-4 pt-1 space-y-2 text-sm text-gray-300 border-t border-gray-700"
                                  }
                                >
                                  {el.highlights.map((point, i) => (
                                    <li key={i} className="flex gap-2 pt-2 first:pt-3">
                                      <span className="text-blue-500 leading-6">•</span>
                                      <span className="leading-6">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <motion.div>
            <h4 className="mt-12 text-3xl font-semibold text-blue-500">
              Technologies and Tools
            </h4>
            <p
              className={
                darkMode
                  ? "mt-4 text-xl text-justify text-gray-500"
                  : "mt-4 text-xl text-justify text-white"
              }
            >
              Using a combination of cutting-edge technologies and reliable
              open-source software I build user-focused, performant apps and
              websites for smartphones, tablets, and desktops.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap mt-8 flex flex-wrap justify-between ">
            {techStack.map((el, index) => (
              <motion.div
                initial="hidden"
                whileInView={"visible"}
                variants={{
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                    },
                  },
                  hidden: { opacity: 1, y: 80 },
                }}
                className="py-2 px-4 bg-gray-50 md:m-4 mx-2 mt-6 rounded-lg flex items-center hover:scale-125 cursor-pointer md:w-48 w-40"
              >
                <img alt="" src={el.link} className="w-12" />
                <h4 className="text-md ml-4">{el.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
