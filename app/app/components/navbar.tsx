import * as React from "react";
import { Link } from "remix";
import clsx from "clsx";
import { json, LoaderFunction } from "remix";
import { i18n } from "~/i18n.server"; // this is the first file you created
import { useTranslation } from "react-i18next";

type NavItem = {
  name: string;
} & (
  | { children: NavItem[]; to?: never }
  | {
      to: string;
      children?: never;
    }
);

export default function Navbar() {
  let { t } = useTranslation("common");
  const LINKS: NavItem[] = [
    { name: t("navbar.links.services"), to: "/services" },
    {
      name: t("navbar.links.test.name"),
      children: [
        { name: t("navbar.links.test.children.test1"), to: "/test/test1" },
        {
          name: t("navbar.links.test.children.test2.name"),
          children: [
            {
              name: t("navbar.links.test.children.test2.children.test3"),
              to: "/test/test2/test3",
            },
          ],
        },
      ],
    },
  ];

  return <h1>{JSON.stringify(LINKS)}</h1>;
}
