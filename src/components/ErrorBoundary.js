import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    // Zaktualizuj stan, aby następny render pokazał zastępcze UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
    console.error(error, errorInfo);
  }
  render() {
    const { message, children } = this.props;
    return this.state.hasError ? message : children;
  }
}
ErrorBoundary.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default ErrorBoundary;