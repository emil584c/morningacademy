export default function RightSVG ({attributes}) {
  return (
    <div className="mt-contact-section-primary__employees mt-contact-section-primary__employees--right">
      <svg xmlns="http://www.w3.org/2000/svg" width="257" height="514" viewBox="0 0 257 514" fill="none">
        <path opacity="0.1" d="M77.5008 508.8C163.42 532.959 260.672 455.157 255.961 366.03C248.582 226.406 95.3635 250.267 28.5074 164.27C-57.7763 53.283 85.5077 -18.5301 85.5077 -18.5301" stroke="black"/>
      </svg>
      {attributes.rightTopEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--top">
          <img
            src={attributes.rightTopEmployee.image.src}
            alt={attributes.rightTopEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
      {attributes.rightMiddleEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--middle">
          <img
            src={attributes.rightMiddleEmployee.image.src}
            alt={attributes.rightMiddleEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
      {attributes.rightBottomEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--bottom">
          <img
            src={attributes.rightBottomEmployee.image.src}
            alt={attributes.rightBottomEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
    </div>
)
}
