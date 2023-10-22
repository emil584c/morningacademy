import {
  InspectorControls,
  useBlockProps,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";
import metadata from "./block.json";
import classNames from "classnames";
import {
  PanelBody,
  __experimentalInputControl as InputControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

export default function Edit({
  attributes,
  setAttributes,
  isSelected,
  context,
}) {
  const blockProps = useBlockProps({
    className: classNames("mt-post-slider-posts", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  const categories = useSelect((select) => {
    const terms = select("core").getEntityRecords("taxonomy", "category");

    if (!terms || terms.length === 0) {
      return [];
    }

    // remove uncategorized
    const filteredTerms = terms.filter(
      (term) => term.slug !== "uncategorized" && term.parent === 0
    );

    const newTerms = filteredTerms.map((term) => {
      return {
        label: term.name,
        value: term.id,
      };
    });

    return [{ label: "Vælg kategori", value: 0 }].concat(newTerms);
  }, []);

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
        {categories && (
          <PanelBody title={__("Kategori", "ma")}>
            <SelectControl
              value={attributes.termId}
              help={__(
                "Vis de 10 nyeste indlæg fra den valgte kategori",
                "ma"
              )}
              onChange={(termId) => setAttributes({ termId: parseInt(termId) })}
              options={categories}
            />
          </PanelBody>
        )}
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
          <ServerSideRender
            block={metadata.name}
            attributes={attributes}
          />
        </div>
      </section>
    </>
  );
}
