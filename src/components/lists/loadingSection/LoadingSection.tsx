import classes from "./LoadingSection.module.css";

const LoadingSection : React.FC<{isEnd: boolean}> = ({isEnd}) => {
  return (
    <>
      { isEnd 
        ? <div className={classes.loading}>마지막 페이지입니다</div> 
        : <div id="Loading" className={classes.loading}>Loading...</div> }
    </>
      
  );
};

export default LoadingSection;
