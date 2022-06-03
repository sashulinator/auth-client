import {
  DocumentCardLocation,
  DocumentCard as DocumentCardUI, //   DocumentCardPreview,
  //    DocumentCardDetails, DocumentCardTitle,
  //    DocumentCardActivity,
  //    IDocumentCardPreviewProps,
  IDocumentCardLocationProps, //    Stack, IStackTokens
  IDocumentCardProps, //    DocumentCardType,
  //    IDocumentCardActivityPerson,
} from '@fluentui/react'

import React from 'react'

// import { FC } from 'react'
// import { getTheme } from '@fluentui/react/lib/Styling'
// import { normalizeOptions } from '@/src/lib/normalize-options'

// const stackTokens: IStackTokens = { childrenGap: 20 };
// const theme = getTheme();
// const { palette, fonts } = theme;

// const people: IDocumentCardActivityPerson[] = [
//     { name: 'Annie Lindqvist', profileImageSrc: ''}
//   ]

// const previewPropsUsingIcon: IDocumentCardPreviewProps = {
// previewImages: [
//     {
//     previewIconProps: {
//         iconName: 'OpenFile',
//         styles: { root: { fontSize: fonts.superLarge.fontSize, color: palette.white } },
//     },
//     width: 144,
//     },
// ],
// styles: { previewIcon: { backgroundColor: palette.themePrimary } },
// };

// const previewProps: IDocumentCardPreviewProps = {
//     getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
//     previewImages: [
//       {
//         name: 'Contoso Marketing Presentation',
//         linkProps: {
//           href: 'http://bing.com',
//           target: '_blank',
//         },
//         previewImageSrc: 'Add',
//         iconSrc: 'Add',
//         width: 144,
//       },
//     ]
//   }

type DocumentCardProps = IDocumentCardProps & { label: string; children: React.ReactNode[] }
type DocumentCardLocationProps = IDocumentCardLocationProps

export default function DocumentCard(props: DocumentCardProps, locationProps: DocumentCardLocationProps): JSX.Element {
  return (
    <DocumentCardUI
      {...props}
      aria-label="Document Card with multiple items, commands and views. Marketing documents. 6 files were uploaded.
      Created by Annie Lindqvist in February 23, 2016. 432 views."
    >
      <DocumentCardLocation {...locationProps} />
    </DocumentCardUI>
  )
}
