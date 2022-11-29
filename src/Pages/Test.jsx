import React, { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../firebase";
import Add from "../Assets/addAvatar.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FileBase64 from "react-file-base64";

const initialState = {
  email: "",
  password: "",
  displayName: "",
  file: "",
};

const Test = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [file, setFile] = useState("");
  const { email, password, displayName } = formValue;
 
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(value);
  };

  const onImageChange = ({base64}) => {
    setFile(base64)
    console.log(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    console.log("Clicked", { email: email, password: password });
    const res = await createUserWithEmailAndPassword(auth, email, password);
    //Create a unique image name
    if (res) {
          console.log(res?.user?.uid);
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: file,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: displayName,
            email: email,
            photoURL: file,
          })
            .then(() => {
              // Data saved successfully!
              console.log("data submitted");
             })
            .catch((error) => {
              // The write failed...
              console.log(error);
            });
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Firebase Crud</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="displayName"
            name="displayName"
            onChange={onInputChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={onInputChange}
          />
          {/* <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={onImageChange}
          /> */}
          <label htmlFor="file">
            <span>Add an avatar</span>
          </label>
          <FileBase64 type="file" multiple={false} onDone={onImageChange} />
          
          <button type="submit">Sign in</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        {/* <p>You don't have an account? <Link to="/register">Register</Link></p> */}
      </div>
    </div>
  );
};

export default Test;
