import classes from "./Title.module.css";

const Title: React.FC = () => {
  const titleText = "무신사 글로벌";
  return <div className={classes.Title}>{titleText}</div>;
};

export default Title;
