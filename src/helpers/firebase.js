import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import {
  toastBlueNotify,
  toastGreenNotify,
  toastRedNotify,
  toastYellowNotify,
} from "./toastNotify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! Create user
export const createUser = async (values, navigate) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  const auth = getAuth(app);
  const { email, password } = values;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // console.log("signin", values);
    navigate("/");
    toastGreenNotify("Registered successfully!");
    // console.log(userCredential);
  } catch (error) {
    toastRedNotify(error.message);
    // alert(error.message);
  }
};

//! Email/password ile giriş
export const signIn = async (values, navigate) => {
  const auth = getAuth(app);
  const { email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastGreenNotify("Logged in successfully!");
  } catch (error) {
    toastRedNotify(error.message);
    // alert(error.message);
  }
};

//! Listen user
export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email } = user;
      setCurrentUser({ email: email });
      // console.log(user);
      // console.log(user);
    } else {
      setCurrentUser(false);
      // console.log("user signed out");
    }
  });
};

//! Logout
export const logOut = () => {
  const auth = getAuth(app);
  signOut(auth);
  toastYellowNotify("Logged out successfully!");
};

//! Signin Google
export const signUpWithGoogle = (navigate) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log("google", result.user.email);
      navigate("/");
      // setCurrentUser(result.user.email);
      toastGreenNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      // console.log(error);
      toastRedNotify(error.message);
    });
};

//! Add Blog
export const AddBlog = (values, currentUser) => {
  const db = getDatabase(app);
  const blogRef = ref(db, "user/");
  const newBlogRef = push(blogRef);

  set(newBlogRef, {
    title: values.title,
    imageUrl: values.imageUrl,
    content: values.content,
    email: currentUser.email,
    createdOn: new Date().toDateString(),
  });
  toastBlueNotify("Blog added auccessfully");
};

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogList, setBlogList] = useState();
  const db = getDatabase(app);
  useEffect(() => {
    const userRef = ref(db, "user/");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];

      for (let id in data) {
        userArray.push({ id, ...data[id] });
      }
      setBlogList(userArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, blogList };
};

export const UpdatedBlog = (info) => {
  const db = getDatabase(app);

  const updates = {};
  updates["user/" + info.id] = info;
  toastBlueNotify("Blog updated successfully");
  return update(ref(db), updates);
};

export const DeleteBlog = (id) => {
  const db = getDatabase(app);
  remove(ref(db, "user/" + id));
  toastRedNotify("Blog deleted successfully");
};
