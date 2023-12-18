import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";
import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { ImageControl } from "wp-blockeditor-utilities";
import { PanelBody } from "@wordpress/components";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames("mt-frontpage-cover", "page-container", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Billeder", "mf")}>
          <p className={"mt-text"}>{__("Billede til lille cirkel", "mf")}</p>
          <ImageControl value={attributes.firstImage} onChange={(firstImage) => setAttributes({ firstImage })} />
          <p className={"mt-text"}>{__("Billede til stor cirkel", "mf")}</p>
          <ImageControl value={attributes.secondImage} onChange={(secondImage) => setAttributes({ secondImage })} />
          <p className={"mt-text"}>{__("Billede til pille", "mf")}</p>
          <ImageControl value={attributes.thirdImage} onChange={(thirdImage) => setAttributes({ thirdImage })} />
        </PanelBody>
      </InspectorControls>
      <section {...blockProps}>
        <ServerSideRender block={metadata.name} />
      </section>
    </>
  );
}
