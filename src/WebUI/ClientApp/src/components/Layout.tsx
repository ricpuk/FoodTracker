import * as React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { ApplicationState } from "../store";
import * as ApplicationParamsStore from "../store/ApplicationParams";
import NavMenu from "./NavMenu";

type LayoutProps = ApplicationParamsStore.ApplicationParamsState & // ... state we've requested from the Redux store
  typeof ApplicationParamsStore.actionCreators; // ... plus action creators we've requested

class Layout extends React.PureComponent<
  LayoutProps,
  { children?: React.ReactNode }
> {
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    if (window.innerWidth > 500 && this.props.isMobile) {
      this.props.setIsMobile(false);
      return;
    }
    if (window.innerWidth < 500 && !this.props.isMobile) {
      this.props.setIsMobile(true);
      return;
    }
  };

  public render() {
    return (
      <React.Fragment>
        <NavMenu isMobile={this.props.isMobile} />
        <Container>{this.props.children}</Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.application, // Selects which state properties are merged into the component's props
  ApplicationParamsStore.actionCreators // Selects which action creators are merged into the component's props
)(Layout as any); // eslint-disable-line @typescript-eslint/no-explicit-any
