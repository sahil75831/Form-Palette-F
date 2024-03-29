"use client";
import React, { useState } from "react";
import css from "./ProjectCard.module.scss";

import { CgPlayTrackNextR,CgPlayTrackPrevR } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDelete,MdPublishedWithChanges } from "react-icons/md";

const ProjectCard = () => {
  const [openActionsIndex, setOpenActionsIndex] = useState(null);
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);

  const handleActionButtonClick = (index) => {
    setOpenActionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };
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
            {arr.map((e, i) => {
              return (
                <tr key={i}>
                  <td className={css.title}>abc</td>
                  <td className={css.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse nobis perspiciatis alias libero repud {true && "..."}
                  </td>
                  <td className={css.status}>Pending</td>
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
                        <ul>
                          <li>
                            Edit <FaEdit />
                          </li>
                          <li>
                            Delete <MdDelete />
                          </li>
                          <li>Publish <MdPublishedWithChanges/></li>
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
          <span>
            <CgPlayTrackPrevR />
          </span>
          <div className={css.rowsNumber}>
            <span>Rows per page</span>
            <select name="" id="">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <span>
            <CgPlayTrackNextR />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

// delete active and edit
