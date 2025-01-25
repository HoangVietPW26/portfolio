import React from "react";
import { useState, useEffect, useMemo } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import "./Works.scss";

window.client = client;
const Works = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 6;

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);
  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setCurrentPage(1);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  const paginationData = useMemo(() => {
    const indexOfLastWork = currentPage * worksPerPage;
    const indexOfFirstWork = indexOfLastWork - worksPerPage;
    const currentWorks = filterWork.slice(indexOfFirstWork, indexOfLastWork);
    const totalPages = Math.ceil(filterWork.length / worksPerPage);

    return { currentWorks, totalPages };
  }, [filterWork, currentPage, worksPerPage]);
  console.log(paginationData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(paginationData.totalPages, prev + 1));
  };

  return (
    <>
      <h2 className="head-text">
        My creative <span>projects</span> section
      </h2>
      <h4 className="bold-text" style={{ marginTop: 5 }}>
        Hover to see link to <span>product</span> and <span>code</span>
      </h4>
      <div className="app__work-filter">
        {[
          "Web",
          "Mobile",
          "AI",
          "System",
          "Javascript",
          "Typescript",
          "Python",
          "All",
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleWorkFilter(item);
            }}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {paginationData.totalPages > 1 && (
        <div className="app__work-pagination app__flex">
          <div
            className={`app__work-filter-item pagination-arrow ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={goToPreviousPage}
          >
            <AiOutlineLeft />
          </div>

          {[...Array(paginationData.totalPages)].map((_, index) => (
            <div
              key={index}
              onClick={() => paginate(index + 1)}
              className={`app__work-pagination-item ${
                currentPage === index + 1 ? "pagination-item-active" : ""
              }`}
            >
              {index + 1}
            </div>
          ))}

          <div
            className={`app__work-filter-item pagination-arrow ${
              currentPage === paginationData.totalPages ? "disabled" : ""
            }`}
            onClick={goToNextPage}
          >
            <AiOutlineRight />
          </div>
        </div>
      )}

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {paginationData.currentWorks.map((work, index) => (
          // {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl).url()} alt={work.name} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="_noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="_noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Works, "app__works"),
  "projects",
  "app__whitebg"
);
