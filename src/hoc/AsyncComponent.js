import React from 'react';

const AsyncComponent = (importComp) => {
  return class extends React.Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComp().then((result) => {
        this.setState({ component: result.default });
      });
    }

    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
