import { Component } from "react";
import { Field } from "./components/Field/Field";
import { Info } from "./components/Info/Info";

export class Game extends Component {
  render() {
    return (
      <>
        <Info></Info>
        <Field></Field>
      </>
    );
  }
}
