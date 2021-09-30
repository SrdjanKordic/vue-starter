import store from "../../../store";

export default (to, from, next) => {
  if (store.getters["isAuth"]) {
    next({ name: "posts" });
  } else {
    next();
  }
};
