import classes from "./TopButton.module.css";

const TopButton: React.FC = () => {
  const topButtonHandler = () => {
    window.scrollTo(0, 0);
  }
  return <button className={classes.topButton} onClick={topButtonHandler}>&#8593;</button>
}

export default TopButton;