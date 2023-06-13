import {useRouteError} from 'react-router-dom';

const ErrorComponent: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page" className="error-component">
      <h1>Robot not found!</h1>
      <p>The page you are looking for has been lost to instrumentality.</p>
      <p>
        The error code is:{' '}
        {(error as Error)?.message ||
          (error as {statusText?: string})?.statusText}
      </p>
    </div>
  );
};
export default ErrorComponent;
