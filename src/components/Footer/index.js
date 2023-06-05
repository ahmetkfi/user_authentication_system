import React from "react";
import Link from "next/link";

import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made with ❤️ by&nbsp;
      <Link href="https://github.com/ahmetkfi" target="_blank">
        Ahmet Kocyigit
      </Link>
    </footer>
  );
}

