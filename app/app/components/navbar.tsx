import * as React from "react";
import { Link, useLocation } from "remix";
import clsx from "clsx";
import { json, LoaderFunction } from "remix";
import { i18n } from "~/i18n.server";
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

function NavLink({
  to,
  ...rest
}: Omit<Parameters<typeof Link>["0"], "to"> & { to: string }) {
  const location = useLocation();
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`);

  return (
    <li className="px-5 py-2">
      <Link
        prefetch="intent"
        className={clsx(
          "underlined block hover:text-team-current focus:text-team-current whitespace-nowrap text-lg font-medium focus:outline-none",
          {
            "text-team-current active": isSelected,
            "text-secondary": !isSelected,
          }
        )}
        to={to}
        {...rest}
      />
    </li>
  );
}

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
