import React from "react";
import classNames from "classnames";

export default function PostCard({ excerpt, title, link, image, date, fullImage, circleColor, terms, series }) {
  return (
    <>
      <div className="mt-guide-card">
        <div className="mt-guide-card__inner">
          {!fullImage ? (
            <>
              <div className="mt-guide-card__text-container">
                {title && <h4>{title}</h4>}
                <div>
                  <div className="mt-guide-card__info">
                    {series && <p className="mt-guide-card__series">Serie: {series.name}</p>}
                    <div className="mt-guide-card__info-row">
                      <div className="mt-guide-card__category-row">
                        {terms &&
                          terms.map((term, index) => (
                            <>
                              {term["text"] !== "Guides til dig" && (
                                <div className="mt-guide-card__info-item-container">
                                  <p key={index} className="mt-guide-card__info-item">
                                    {term["text"]}
                                  </p>
                                </div>
                              )}
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-guide-card__image-container object-fit">
                <img src={image} alt="" />
              </div>
              <div style={{ backgroundColor: circleColor || "#F8CFB1" }} className="mt-guide-card__color-circle"></div>
            </>
          ) : (
            <div className="mt-guide-card__full-image-container object-fit">
              <img src={fullImage["url"]} alt="" />
            </div>
          )}
        </div>
        <a className="mt-guide-card__link" href={link}></a>
      </div>
    </>
  );
}
