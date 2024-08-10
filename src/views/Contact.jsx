import React, { useContext, useState } from "react";
import { contactLinks } from "../constants";
import { ThemeContext } from "../themeProvider";
import emailjs from "emailjs-com";

const Contact = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { name, email } = formData;
  
    if (!name || !email) {
      setFormErrors({
        name: !name,
        email: !email,
      });
      return;
    }
  
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setFormErrors({
            name: false,
            email: false,
          });
        },
        (error) => {
          alert("Failed to send the message, please try again.");
        }
      );
  };
  
  return (
    <div
      id="contact"
      className={
        darkMode
          ? "bg-gray-100 pt-24 md:h-screen"
          : "bg-black pt-24 text-white md:h-screen"
      }
    >
      <div className="max-w-7xl mx-auto x-4 sm:px-6 lg:px-8 px-4 ">
        <h2 className="text-5xl font-bold px-4 md:px-0 text-center z-0">
          Contact
        </h2>
        <div>
          <h4 className="mt-12 text-3xl font-semibold text-blue-500">
            Connect with me
          </h4>
          <p className="text-gray-500 text-xl">
            If you want to know more about me or my work, or if you would just
            <br />
            like to say hello, send me a message. I'd love to hear from you.
          </p>
        </div>
        <div className="flex justify-between items-center md:items-stretch  flex-col md:flex-row pb-24">
          <div className="w-full md:pr-8">
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label
                  for="name"
                  class={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                   name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-2">Name is required</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    formErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter your email"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-2">Email is required</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 h-28 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your message"
                />
              </div>
              <div className="flex justify-between">
                <div className="underline">
                  <a href="mailto:bhautikkapadiya06@gmail.com">
                    Send me email directly
                  </a>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 w-40 rounded-md hover:bg-indigo-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex flex-col md:items-end mt-12 md:mt-6">
            <h1 className="text-3xl font-bold">Email</h1>
            <a
              href="mailto:bhautikkapadiya06@gmail.com"
              className="mb-12 mt-4 font-semibold text-blue-700 block"
            >
              bhautikkapadiya06@gmail.com
            </a>
            <h1 className="text-3xl font-bold">Social</h1>
            <ul className="flex">
              {contactLinks.map((el, index) => (
                <a
                  key={index}
                  href={el.link}
                  className="md:ml-6 md:mr-0 mr-6 cursor-pointer mt-4 hover:scale-125 flex flex-col justify-center items-center"
                >
                  <img alt="" src={el.url} />
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          darkMode
            ? "w-full bg-white text-black text-lg py-3 flex justify-center md:mt-20"
            : "w-full bg-gray-900 text-white text-lg py-3 flex justify-center md:mt-20"
        }
      >
        Made with
        <div className="text-red-500 px-2 text-2xl">&#10084;</div>
        by Bhautik Kapadiya
      </div>
    </div>
  );
};

export default Contact;
