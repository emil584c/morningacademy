import { __ } from "@wordpress/i18n";

export default function TypeSelector({ onChange }) {
  return (
    <div className="type-selector">
      <p>{__("Hvilke indlæg vil du vise?", "ma")}</p>
      <button
        className="wp-block-button__link wp-element-button"
        onClick={() => onChange("ma/post-slider-posts-picker")}
      >
        {__("Jeg vil selv vælge", "ma")}
      </button>
      <span>-- {__("eller", "ma")} --</span>
      <button className="wp-block-button__link wp-element-button" onClick={() => onChange("ma/post-slider-posts", {})}>
        {__("Vis de nyeste", "ma")}
      </button>
    </div>
  );
}
