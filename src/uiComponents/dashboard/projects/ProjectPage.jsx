"use client";
import React, { useEffect, useState } from "react";
import css from "./ProjectPage.module.scss";
import ProjectCard from "./projectCard/ProjectCard";
import Link from "next/link";

const ProjectPage = () => {
  const [query, setQuery] = useState("");
  const [projectListArr, setProjectListArr] = useState([
    { title: "loading...", description: "loading", visiblity: "loading..." },
  ]);

  const search = (data) => {
    const result = data.filter((item) =>
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) 
      // item.visiblity?.toString().toLowerCase().includes(query.includes() === 'pending') 
    );
    // console.log("result ::) ", result);
    return result;
  };


  return (
    <div className={css.ProjectPage}>
      <div className={css.wrapper}>
        <div className={css.head}>Projects</div>

        <div className={css.subhead}>
          <input
            type="text"
            placeholder="Filter projects.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Link href={"/dashboard/projects/createNewProject"}>
            <button className={`primaryButton ${css.btn}`}>
              + Create New Project
            </button>
          </Link>
        </div>

        <div className={css.projectListGrid}>
          <div className={css.projectListGrid}></div>
          <div className={css.projectListCard}>
            <ProjectCard
              setProjectListArr={setProjectListArr}
              projectListArr={search(projectListArr)}
            />
          </div>
        </div>

        {/* <div className={css.pagination}> welome to pagination</div> */}
      </div>
    </div>
  );
};

export default ProjectPage;

// "use client"
// import React, { useState } from "react";
// import css from "./ProjectPage.module.scss";
// import ProjectCard from "./projectCard/ProjectCard";
// import Link from "next/link";

// const ProjectPage = () => {
//   const [query, setQuery] = useState("");  
//   const [projectListArr, setProjectListArr] = useState([
//     { title: "loading...", description: "loading", visibility: "loading..." },  
//   ]);

//   const search = (data) => {
//     return data.filter((item) =>  
//       item.title?.toLowerCase().includes(query.toLowerCase()) ||
//       item.description?.toLowerCase().includes(query.toLowerCase())
//     );
//   };

//   return (
//     <div className={css.ProjectPage}>  
//       <div className={css.wrapper}>
//         <div className={css.head}>Projects</div>

//         <div className={css.subhead}>
//           <input
//             type="text"
//             placeholder="Filter projects.."
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//           />
//           <Link href={"/dashboard/projects/createNewProject"}>
//             <button className={`primaryButton ${css.btn}`}>
//               + Create New Project
//             </button>
//           </Link>
//         </div>

//         <div className={css.projectListGrid}>
//           <div className={css.projectListGrid}></div>
//           <div className={css.projectListCard}>
//             <ProjectCard
//               setProjectListArr={setProjectListArr}
//               projectListArr={search(projectListArr)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;


