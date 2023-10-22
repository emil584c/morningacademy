import { __ } from "@wordpress/i18n";

export default function TypeSelector({ onChange }) {
  return (
    <div className="type-selector">
      <p>{__("Hvilke indlæg vil du vise?", "morningtrain")}</p>
      <button
        className="wp-block-button__link wp-element-button"
        onClick={() => onChange("ma/post-slider-posts-picker")}
      >
        {__("Jeg vil selv vælge", "morningtrain")}
      </button>
      <span>-- {__("eller", "morningtrain")} --</span>
      <button
        className="wp-block-button__link wp-element-button"
        onClick={() => onChange("ma/post-slider-posts", {})}
      >
        {__("Vis de nyeste", "morningtrain")}
      </button>
    </div>
  );
}
