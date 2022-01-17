import classes from "./styles/FloatingButton.module.css";

function FloatingButton() {
  return (
    <div className={classes.float}>
      <i className={`fa fa-plus ${classes.myFloat}`}></i>
    </div>
  );
}

export default FloatingButton;
