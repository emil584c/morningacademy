import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import Message from "../../js/block-controls/Message";

export default function Edit({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: "mt-guide-overview",
  });

  return (
    <section {...blockProps}>
      <div className="page-container">
        <RichText
          className="mt-guide-overview__paragraph"
          tagName={"p"}
          placeholder={__("Text", "ma")}
          value={attributes.paragraph}
          onChange={(paragraph) => setAttributes({ paragraph })}
          allowedFormats={[]}
        />
        <Message content={__("Her vises 4 videoer til specifikke brugere", "ma")} position={"top"} />
        <RichText
          className="mt-guide-overview__paragraph"
          tagName={"p"}
          placeholder={__("Text", "ma")}
          value={attributes.paragraph2}
          onChange={(paragraph2) => setAttributes({ paragraph2 })}
          allowedFormats={[]}
        />
        <Message content={__("Her vises 4 offentlige brugere", "ma")} position={"bottom"} />
      </div>
    </section>
  );
}
