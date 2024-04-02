"use client";
import React, { useRef, useState } from "react";
import css from "./CreateNewProject.module.scss";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { useAuth } from "@/utils/AuthContext";
import { v4 as uuidv4 } from "uuid";

const CreateNewProject = () => {
  const auth = useAuth();
  console.log("auth : ", auth);
  // const userId = auth.user.id;// why this give an error on hard reload directly this create project page
  const userId = auth.user?.id; // why this give an error on hard reload directly this create project page

  console.log("userEmail : ", userId);
  const [signedURL, setSigneURL] = useState(null);
  const [fileName_UUID, setFileName_UUID] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brandImageUrl: "",
    startDate: "",
    endDate: "",
    visiblity: "public",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      console.log("e.target.files[0].name )) ", e.target.files[0].name);
      const uuidString = uuidv4();
      setFileName_UUID(uuidString);


      fetch(
        `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/createNewProject/throwSignedURL`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: uuidString }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch signed URL");
          }
          console.log("res:::::::::::::::::::::::: ", res)
          // console.log("res::::::::::::::::::::::::json ", res.json())
          return res;
        })
        .then((data) => {
          console.log("data llll ", data)
          setSigneURL(data.signed_url);
        })
        .catch((err) => {
          console.error("Error fetching signed URL:", err);
          // Handle the error gracefully, e.g., display an error message to the user
        });

        
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSumbit = (e) => {
    e.preventDefault();
    console.log("signed url ::??? ", signedURL)
    fetch(signedURL, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData.brandImageUrl,
    })
      .then((res) => {
        if (res.ok) {
          console.log("response is okay", res);
        } else {
          console.error("Error uploading image:", res.statusText);
          throw new Error("Image upload failed"); // Re-throw for potential error handling
        }
      })
      .then((data) => console.log("data : ", data))
      .catch((err) => console.log("err : ", err));

    const { brandImageUrl, ...newData } = formData;
    const newDataToSendServer = newData;
    fetch(
      `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/createNewProject`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName_UUID, userId, ...newDataToSendServer }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error uploading image:", res.statusText);
          throw new Error("Image upload failed"); // Re-throw for potential error handling
        }
      })
      .then((data) => console.log("data : ", data))
      .catch((err) => console.log("err : ", err));
  };

  return (
    <div className={css.CreateNewProject}>
      <div className={css.container}>
        <h1>Create New Project</h1>
        <form onSubmit={(e) => handleFormSumbit(e)}>
          <input
            type="text"
            name="title"
            placeholder="Project name..."
            onChange={(e) => handleChange(e)}
            className={css.projectName}
            required={true}
          />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="3"
            onChange={(e) => handleChange(e)}
            placeholder="description..."
            className={css.projectDescription}
            required={true}
          ></textarea>

          <label htmlFor="file" onClick={(e) => e.preventDefault()}>
            Upload Brand Image
          </label>
          <input
            type="file"
            id="file"
            name="brandImageUrl"
            onChange={(e) => handleChange(e)}
            accept=".jpeg, .jpg, .png"
            className={css.projectName}
            required={true}
          />

          <div className={css.visiblitySection}>
            <span>Visiblity</span>
            <div className={css.visiblitySectionLabels}>
              <label htmlFor="Public">
                <input
                  type="radio"
                  id="public"
                  name="visiblity"
                  value="public"
                  checked={formData.visiblity === "public"} // Update check condition
                  onChange={(e) => handleChange(e)}
                />
                <span>
                  Public <MdPublic />
                </span>
              </label>
              <label htmlFor="Private">
                <input
                  type="radio"
                  id="private"
                  name="visiblity"
                  value="private"
                  checked={formData.visiblity === "private"} // Update check condition
                  onChange={(e) => handleChange(e)}
                />
                <span>
                  Private <RiGitRepositoryPrivateFill />
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
                name="startDate"
                value={formData.startDate}
                required={true}
                onChange={(e) => handleChange(e)}
                className={css.startDate}
              />
            </label>
            <label htmlFor="date">
              <span>End Date:</span>
              <input
                type="date"
                id="date"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => handleChange(e)}
                className={css.startDate}
                required={true}
              />
            </label>
          </div>

          <button className="primaryButton" type="submit">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProject;


// "use client";
// import React, { useRef, useState } from "react";
// import css from "./CreateNewProject.module.scss";
// import { MdPublic } from "react-icons/md";
// import { RiGitRepositoryPrivateFill } from "react-icons/ri";
// import { useAuth } from "@/utils/AuthContext";

// const CreateNewProject = () => {
//   const auth = useAuth()
//   console.log("auth : ", auth)
//   // const userId = auth.user.id;// why this give an error on hard reload directly this create project page
//   const userId = auth.user?.id;// why this give an error on hard reload directly this create project page
  
//   console.log("userEmail : ", userId)
//   const [signedURL, setSigneURL] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     brandImageUrl: "",
//     startDate: "",
//     endDate: "",
//     visiblity: "public",
//   });

//   const handleChange = (e) => {
//     if (e.target.type === "file") {
//       console.log("e.target.files[0].name )) ", e.target.files[0].name);
//       fetch(
//         `${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/createNewProject/throwSignedURL`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: e.target.files[0].name }),
//         }
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setSigneURL(data.signed_url);
//         })
//         .catch((err) => console.log(err));

//       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleFormSumbit = (e) => {
//     e.preventDefault();

//     fetch(signedURL, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       body: formData.brandImageUrl,
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("response is okay", res);
//         } else {
//           console.error("Error uploading image:", res.statusText);
//           throw new Error("Image upload failed"); // Re-throw for potential error handling
//         }
//       })
//       .then((data) => console.log("data : ", data))
//       .catch((err) => console.log("err : ", err));

//       const {brandImageUrl, ...newData} = formData
//       const newDataToSendServer = newData 
//     fetch(`${process.env.NEXT_PUBLIC_SERVERBASEURL}/dashboard/projects/createNewProject`, {
//       method: "POST",
//       cache:"no-store",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({signedURL, userId,...newDataToSendServer}),
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json()
//         } else {
//           console.error("Error uploading image:", res.statusText);
//           throw new Error("Image upload failed"); // Re-throw for potential error handling
//         }
//       })
//       .then((data) => console.log("data : ", data))
//       .catch((err) => console.log("err : ", err));
//   };

//   return (
//     <div className={css.CreateNewProject}>
//       <div className={css.container}>
//         <h1>Create New Project</h1>
//         <form onSubmit={(e) => handleFormSumbit(e)}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Project name..."
//             onChange={(e) => handleChange(e)}
//             className={css.projectName}
//             required={true}
//           />
//           <textarea
//             name="description"
//             id=""
//             cols="30"
//             rows="3"
//             onChange={(e) => handleChange(e)}
//             placeholder="description..."
//             className={css.projectDescription}
//             required={true}
//           ></textarea>

//           <label htmlFor="file" onClick={(e) => e.preventDefault()}>
//             Upload Brand Image
//           </label>
//           <input
//             type="file"
//             id="file"
//             name="brandImageUrl"
//             onChange={(e) => handleChange(e)}
//             accept=".jpeg, .jpg, .png"
//             className={css.projectName}
//             required={true}
//           />

//           <div className={css.visiblitySection}>
//             <span>Visiblity</span>
//             <div className={css.visiblitySectionLabels}>
//               <label htmlFor="Public">
//                 <input
//                   type="radio"
//                   id="public"
//                   name="visiblity"
//                   value="public"
//                   checked={formData.visiblity === "public"} // Update check condition
//                   onChange={(e) => handleChange(e)}
//                 />
//                 <span>
//                   Public <MdPublic />
//                 </span>
//               </label>
//               <label htmlFor="Private">
//                 <input
//                   type="radio"
//                   id="private"
//                   name="visiblity"
//                   value="private"
//                   checked={formData.visiblity === "private"} // Update check condition
//                   onChange={(e) => handleChange(e)}
//                 />
//                 <span>
//                   Private <RiGitRepositoryPrivateFill />
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div className={css.dateSection}>
//             <label htmlFor="date">
//               <span>Start Date:</span>
//               <input
//                 type="date"
//                 id="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 required={true}
//                 onChange={(e) => handleChange(e)}
//                 className={css.startDate}
//               />
//             </label>
//             <label htmlFor="date">
//               <span>End Date:</span>
//               <input
//                 type="date"
//                 id="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={(e) => handleChange(e)}
//                 className={css.startDate}
//                 required={true}
//               />
//             </label>
//           </div>

//           <button className="primaryButton" type="submit">
//             Create Project
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateNewProject;

