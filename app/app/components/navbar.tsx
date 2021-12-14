import * as React from "react";
import { Link } from "remix";
import clsx from "clsx";
import { json, LoaderFunction } from "remix";
import { i18n } from "~/i18n.server"; // this is the first file you created
import { useTranslation } from "react-i18next";

export default function Navbar() {
  let { t } = useTranslation("common");
  const LINKS = [{ name: t("navbar.links.services"), to: "/services" }];

  return <h1>{LINKS[0].name}</h1>;
}
