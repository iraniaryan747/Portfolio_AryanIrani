import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  /** Omit or leave empty until you have a live URL; card stays interactive on hover without outbound link */
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const inner = (
    <>
      {props.link ? (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      ) : null}
      <img src={props.image} alt={props.alt} />
      {isVideo && (
        <video src={video} autoPlay muted playsInline loop></video>
      )}
    </>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noreferrer"
          data-cursor={"disable"}
        >
          {inner}
        </a>
      ) : (
        <div
          className="work-image-in work-image-placeholder"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor="disable"
          role="img"
          aria-label={props.alt}
        >
          {inner}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
