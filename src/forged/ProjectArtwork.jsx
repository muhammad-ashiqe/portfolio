import { useState } from "react";
import PropTypes from "prop-types";
import { artwork } from "./artwork";
export default function ProjectArtwork({ project, slug, eager = false }) {
  const [failed, setFailed] = useState(false);
  const cover = artwork[slug];
  return (
    <img
      src={failed ? project.image : cover.large}
      srcSet={failed ? undefined : `${cover.small} 640w, ${cover.large} 1280w`}
      sizes="(max-width: 760px) 88vw, 46vw"
      alt={failed ? project.title : cover.alt}
      width="1280"
      height="853"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
ProjectArtwork.propTypes = {
  project: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  eager: PropTypes.bool,
};
