import { createElement } from "react";
import { renderToString } from "react-dom/server";
import StaticPage from "./StaticPage";
export { projects, projectMeta } from "./catalog";
export { profile } from "./content";
export const renderPage = (path) =>
  renderToString(createElement(StaticPage, { path }));
