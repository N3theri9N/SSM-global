import classes from "./Layout.module.css";
import Filter from "./filter/Filter";
import Title from "./title/Title";
import ListsSection from "./lists/ListsSection";

const Layout: React.FC<{}> = () => {
  return (
    <div className={classes.Layout}>
      <Title />
      <Filter />
      <ListsSection />
    </div>
  );
};

export default Layout;
