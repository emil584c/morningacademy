export default function LeftSVG ({attributes}) {
  return (
    <div className="mt-contact-section-primary__employees mt-contact-section-primary__employees--left">
      <svg className="desktop" xmlns="http://www.w3.org/2000/svg" width="374" height="446" viewBox="0 0 374 434" fill="none">
        <path opacity="0.1" d="M134.537 433.3C45.3596 429.676 -23.0317 325.591 9.03701 242.3C38.5001 165.777 123.57 166.011 205.537 168.3C258.248 169.771 335.707 202.586 367.539 147.3C404.88 82.4455 247.037 -1.7002 247.037 -1.7002" stroke="black"/>
      </svg>

      <svg className="mobile" width="341" height="184" viewBox="0 0 341 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" d="M52.1,80.2c-80.4-3.3-48.6,64.1-19.7-11C59,0.3,135.7,0.5,209.5,2.5c47.5,1.3,94.7,23.9,131.9-2.5" stroke="black" stroke-width="0.901349"/>
      </svg>


      {attributes.leftTopEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--top">
          <img
            src={attributes.leftTopEmployee.image.src}
            alt={attributes.leftTopEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
      {attributes.leftMiddleEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--middle">
          <img
            src={attributes.leftMiddleEmployee.image.src}
            alt={attributes.leftMiddleEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
      {attributes.leftBottomEmployee?.image?.src && (
        <div className="mt-contact-section-primary__employees--pill mt-contact-section-primary__employees--pill--bottom">
          <img
            src={attributes.leftBottomEmployee.image.src}
            alt={attributes.leftBottomEmployee?.image?.alt ?? 'Medarbejder'}
          />
        </div>
      )}
    </div>
)
}
