import {
  RichText,
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import classNames from "classnames";
import Message from "./Message";
import { __ } from "@wordpress/i18n";

export default function edit({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames("mt-gide-cover-view", "page-container", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  return (
    <>
      <section {...blockProps}>
        <Message
          content={__("Her vises dit video cover", "ma")}
          position={"top"}
        />
      </section>
    </>
  );
}
