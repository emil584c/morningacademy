import {
  InspectorControls,
  InnerBlocks,
  useBlockProps,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import classNames from "classnames";
import {
  PanelBody,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

export default function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) {
  const blockEditor = useSelect("core/block-editor", []);

  const blockProps = useBlockProps({
    className: classNames("mt-post-slider-posts-container", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  const renderAppender = () => {
    let blockCount = blockEditor.getBlockCount(clientId);
    return blockCount < 10 ? <InnerBlocks.ButtonBlockAppender /> : null;
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Knap link", "ma")}>
          <LinkControl
            value={attributes.link}
            onChange={(link) => setAttributes({ link })}
            onRemove={() => setAttributes({ link: null })}
          />
          <InputControl
            placeholder={__("Link tekst", "ma")}
            value={attributes.linkText}
            onChange={(linkText) => setAttributes({ linkText })}
          />
        </PanelBody>
      </InspectorControls>
      <section {...blockProps}>
        <div className="mt-post-slider__inner">
          <div className="mt-post-slider__text-container">
            <RichText
              placeholder={__("Skriv din tagline her", "ma")}
              className={"mt-post-slider__tagline tagline"}
              tagName={"p"}
              value={attributes.tagline}
              onChange={(tagline) => {
                setAttributes({ tagline });
              }}
            />
            <RichText
              placeholder={__("Skriv din titel her", "ma")}
              className={"mt-post-slider__title title"}
              tagName={"h2"}
              value={attributes.title}
              onChange={(title) => {
                setAttributes({ title });
              }}
            />
          </div>
          <div className="mt-post-slider__post-wrapper">
            <InnerBlocks
              allowedBlocks={["ma/post-slider-post"]}
              renderAppender={renderAppender}
              orientation={"horizontal"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
