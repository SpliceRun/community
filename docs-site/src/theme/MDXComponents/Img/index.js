/**
 * Swizzled from @docusaurus/theme-classic (https://github.com/facebook/docusaurus):
 * every screenshot links to its full-size file, so readers on phones can pinch-zoom
 * with the browser's own image viewer.
 *
 * Portions derived from Docusaurus, Copyright (c) Facebook, Inc. and its affiliates.
 * Used under the MIT License; the full notice is in the NOTICE file at the repository root.
 * Modifications by SpliceRun are licensed under Apache-2.0 (see LICENSE and LICENSES.md).
 */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function MDXImg(props) {
  const {className, src, alt, ...rest} = props;

  const img = (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      decoding="async"
      // Not loading="lazy": custom.css gives `.markdown img` width:auto, which resolves to
      // zero for an image that has not loaded, so a lazy image would never be fetched.
      src={src}
      alt={alt}
      {...rest}
      className={clsx(className, styles.img)}
    />
  );

  // Inline images (emoji, badges) and anything without a resolvable src stay
  // as they are — a link around a 16px icon is a mis-tap waiting to happen.
  if (!src || typeof src !== 'string') {
    return img;
  }

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.zoomLink}
      // Screen readers otherwise announce the alt text twice, once for the
      // link and once for the image inside it.
      aria-label={alt ? `${alt} — open full size` : 'Open image full size'}
    >
      {img}
    </a>
  );
}
