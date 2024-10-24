import styles from "./game.module.css";
import { Field } from "./components/Field/Field";
import { Info } from "./components/Info/Info";

export const GameLayout = (props) => {
  return (
    <>
      <Info {...props}></Info>
      <Field {...props}></Field>
    </>
  );
};
