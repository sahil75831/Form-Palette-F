import React from "react";
import css from "./ProjectPage.module.scss";
import ProjectCard from "./projectCard/ProjectCard";
import Link from "next/link";

const ProjectPage = () => {
  return (
    <div className={css.ProjectPage}>
      <div className={css.wrapper}>
        <div className={css.head}>Projects</div>

        <div className={css.subhead}>
          <input type="text" placeholder="Filter projects.." />
          {/* <button >+ Create New Project</button> */}
          <Link href={"/dashboard/projects/createNewProject"}>
            <button className={`primaryButton ${css.btn}`}>
              + Create New Project
            </button>
          </Link>
        </div>

        <div className={css.projectListGrid}>
          <div className={css.projectListGrid}></div>
          <div className={css.projectListCard}>
            <ProjectCard />
          </div>
        </div>

        {/* <div className={css.pagination}> welome to pagination</div> */}
      </div>
    </div>
  );
};

export default ProjectPage;
