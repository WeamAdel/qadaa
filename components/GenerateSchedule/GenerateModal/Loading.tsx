import ProgressSpinner from "../../Spinners/ProgressSpinner";

function Loading() {
  return (
    <div className="generate-modal__content generate-modal__content--loading">
      <ProgressSpinner />
      <p className="generate-modal__desc">
        Please wait until schedule is generated<span aria-hidden="true">...</span>
      </p>
    </div>
  );
}

export default Loading;
