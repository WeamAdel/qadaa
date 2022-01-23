import DangerousIcon from "@mui/icons-material/Dangerous";
import Icon from "../Icon/Icon";

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="form__error-message" role="alert">
      <Icon classes="form__error-icon">
        <DangerousIcon fontSize="small" />
      </Icon>
      {message}
    </p>
  );
}

export default ErrorMessage;
