import classes from "./styles/ContactsPage.module.css";

function Contact(props) {
  return (
    <div className={classes.card} onClick={() => console.log("clicked")}>
      <div className={classes.imageContainerWithHeart}>
        <img
          src="https://picsum.photos/200"
          max-height="20%"
          alt="User profile"
        />
        <i className="fas fa-heart"></i>
      </div>
      <div className={classes.contactInformation}>
        <div className={classes.userProfile}>
          <h4>
            <b>{props.userName}</b>
          </h4>
          <p>{props.contactNumber}</p>
        </div>
        <div className={classes.editOptions}>
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default Contact;
