export default function Message({
  content,
  position = "", // top|bottom
  status = "info", // info|warning|success|error
  shouldDisplay = true,
}) {
  if (!content || shouldDisplay === false) {
    return null;
  }
  const classes = [
    "mt-message",
    position ? `mt-message--position-${position}` : "",
    `mt-message--status-${status}`,
  ];
  return (
    <div className={classes.join(" ")}>
      <div className={"mt-message__text"}>{content}</div>
    </div>
  );
}
