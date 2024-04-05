"use client";
import React, { useEffect, useState } from "react";
import css from "./ProjectCard.module.scss";
import { useAuth } from "@/utils/AuthContext";
import { CgPlayTrackNextR, CgPlayTrackPrevR } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdPublishedWithChanges } from "react-icons/md";
import confetti from "canvas-confetti";
const ProjectCard = ({ setProjectListArr, projectListArr }) => {
  const auth = useAuth();
  const userID = auth.user?.id;

  const [openActionsIndex, setOpenActionsIndex] = useState(null);
  // const [projectList, setProjectList] = useState([1, 2, 3, 4, 5]);
  const [dropDownValue, setDropDownValue] = useState(1);
  const [next, setNext] = useState(0);
  const [projectVisiblity, setProjectVisiblity] = useState(false);
  const [visibilityStatus, setVisibilityStatus] = useState(false);

  const handleActionButtonClick = (index) => {
    setOpenActionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleVisiblity = (e, projectID, visiblity) => {
    

    fetch(
      `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/changeProjectStatus/${projectID}/${visiblity}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("invalid reponse");
        }
        return res.json();
      })
      .then((data) => {

        setProjectListArr((prevProjectListArr) => {
          return prevProjectListArr.map((project) =>
            project.id === projectID
              ? { ...project, visiblity: data.changeStatus.visiblity }
              : project
          );
        });

        return setVisibilityStatus((prev) => !prev);
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const handleDeleteProject = (e, projectID) => {
    console.log("index from e :: ", e, projectID);

    fetch(
      `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/deleteProject/${projectID}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("invalid reponse");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data from delet function : ", data);
        setProjectListArr([...data.newProjectsList]);
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  // if we call fetch function outside useEFFECT then why 4 request is going to netwrok tab

  useEffect(() => {
    // console.log("next : inside useffect :: ", next);
    if (userID) {
      // i uncomment this the 3 network request is going why
      fetch(
        `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/listAllProjects/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("invalid reponse");
          }
          return res.json();
        })
        .then((data) => {
          console.log("data --> ", data);
          setProjectListArr([...data.listOfProjects]);
          // this is a complete search method
          return console.log("data : ", data);
        })
        .catch((err) => {
          console.error("err", err);
        });
    }
  }, [userID, dropDownValue, next, projectListArr.length]);

  return (
    <div className={css.ProjectCard}>
      <div className={css.wrapper}>
        <table>
          <thead>
            <tr>
              <th className={css.headTitle}>Title</th>
              <th className={css.headDesc}>Description</th>
              <th className={css.headStatus}>Status</th>
              <th className={css.headAtions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectListArr
              .slice(parseInt(next), parseInt(dropDownValue) + parseInt(next))
              .map((project, i) => {
                return (
                  <tr key={i}>
                    <td className={css.title}>{project.title}</td>
                    <td className={css.desc}>
                      {project.description} {true && "..."}
                    </td>
                    <td
                      className={
                        !project.visiblity
                          ? `${css.statusPending}`
                          : `${css.statusPublished}`
                      }
                    >
                      {project.visiblity === "loading..."
                        ? "loading..."
                        : project.visiblity
                        ? "Published"
                        : "Pending"}
                    </td>
                    <td className={css.actions}>
                      <span
                        onClick={() => handleActionButtonClick(i)}
                        style={{
                          color: openActionsIndex === i ? "lawngreen" : "gray",
                        }}
                      >
                        ...
                      </span>
                      {openActionsIndex === i && (
                        <div className={css.actionsButtonsCard}>
                          <ul onClick={(e) => handleActionButtonClick(false)}>
                            <li>
                              Edit <FaEdit />
                            </li>
                            <li onClick={e=>handleDeleteProject(e, project.id)}>
                              Delete <MdDelete />
                            </li>

                            <li
                              onClick={(e) =>
                                handleVisiblity(
                                  e,
                                  project.id,
                                  project.visiblity
                                )
                              }
                            >
                              {!project.visiblity ? (
                                <span onClick={(e) => {
                                  confetti()
                                  confetti()
                                  confetti()
                                  confetti()
                                }}>Publish</span>
                              ) : (
                                <span>Unpublish</span>
                              )}
                              <MdPublishedWithChanges />
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className={css.pagination}>
          <button
            disabled={next < 1}
            onClick={(e) =>
              setNext((prev) => parseInt(prev) - parseInt(dropDownValue))
            }
          >
            <CgPlayTrackPrevR />
          </button>
          <div className={css.rowsNumber}>
            <span>Rows per page</span>
            <select
              name=""
              id=""
              onChange={(e) => {
                console.log("e : drop down ", e);
                console.log("e.value : drop down ", e.target.value);
                return setDropDownValue(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value={projectListArr.length}>Full List</option>
            </select>
          </div>
          <button
            disabled={
              parseInt(next) + parseInt(dropDownValue) >=
              parseInt(projectListArr.length)
            }
            onClick={(e) =>
              setNext((prev) => parseInt(prev) + parseInt(dropDownValue))
            }
          >
            <CgPlayTrackNextR />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
