interface ErrorPageWrapperI {
  heading: string;
  description: string;
  children: any;
  image: JSX.Element;
}

function ErrorPageWrapper({ heading, description, children, image }: ErrorPageWrapperI) {
  return (
    <div className="container">
      <div className="error-page">
        <div className="error-page__img">{image}</div>
        <h1 className="error-page__heading">{heading}</h1>
        <p className="error-page__description">{description}</p>
        {children}
      </div>
    </div>
  );
}

export default ErrorPageWrapper;
