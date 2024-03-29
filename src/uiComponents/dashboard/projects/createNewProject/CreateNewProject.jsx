"use client";
import React, { useRef, useState } from "react";
import css from "./CreateNewProject.module.scss";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
const CreateNewProject = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  return (
    <div className={css.CreateNewProject}>
      <div className={css.container}>
        <h1>Create New Project</h1>
        <form action="">
          <input
            type="text"
            placeholder="Project name..."
            className={css.projectName}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            placeholder="description..."
            className={css.projectDescription}
          ></textarea>

          <label htmlFor="file" onClick={e=>e.preventDefault()}>Upload Brand Image</label>
          <input
            type="file"
            id="file"
            accept=".jpeg, .jpg, .png"
            className={css.projectName}
          />

          <div className={css.visiblitySection}>
            <span>Visiblity</span>
            <div className={css.visiblitySectionLabels}>
              <label htmlFor="Public">
                <input type="radio" id="public" checked={false} />
                <span>
                  Public <MdPublic />
                </span>
              </label>
              <label htmlFor="Public">
                <input type="radio" id="public" checked={false} />
                <span>
                  Private <RiGitRepositoryPrivateFill />{" "}
                </span>
              </label>
            </div>
          </div>

          <div className={css.dateSection}>
            <label htmlFor="date">
              <span>Start Date:</span>
              <input
                type="date"
                id="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
                className={css.startDate}
              />
            </label>
            <label htmlFor="date">
              <span>End Date:</span>
              <input
                type="date"
                id="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
                className={css.startDate}
              />
            </label>
          </div>

          <button className="primaryButton">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProject;
