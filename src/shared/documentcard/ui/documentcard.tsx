import {
  DocumentCardLocation,
  DocumentCardPreview, //    DocumentCardDetails, DocumentCardTitle,
  //    DocumentCardActivity,
  DocumentCard as DocumentCardUI,
  IDocumentCardLocationProps, //    Stack, IStackTokens
  IDocumentCardPreviewProps,
  IDocumentCardProps, //    DocumentCardType,
  //    IDocumentCardActivityPerson,
} from '@fluentui/react'

import React from 'react'

// import { generateOptionsFromUnknown } from '@/lib/generate-options'
// import normilize from '@/shared/table/lib/normalize';

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
// const previewPropsDemo: IDocumentCardPreviewProps = {
//   getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
//   previewImages: [
//     {
//       name: '2016 Conference Presentation',
//       linkProps: {
//         href: 'http://bing.com',
//         target: '_blank',
//       },
//       width: 318,
//       height: 196,
//     },
//     {
//       name: 'New Contoso Collaboration for Conference Presentation Draft',
//       linkProps: {
//         href: 'http://bing.com',
//         target: '_blank',
//       },
//       width: 318,
//       height: 196,
//     },
// {
//   name: 'Spec Sheet for design',
//   linkProps: {
//     href: 'http://bing.com',
//     target: '_blank',
//   },
//   width: 318,
//   height: 196,
// },
// {
//   name: 'Contoso Marketing Presentation',
//   linkProps: {
//     href: 'http://bing.com',
//     target: '_blank',
//   },
//   width: 318,
//   height: 196,
// },
// {
//   name: 'Notes from Ignite conference',
//   linkProps: {
//     href: 'http://bing.com',
//     target: '_blank',
//   },
//   width: 318,
//   height: 196,
// },
// {
//   name: 'FY17 Cost Projections',
//   linkProps: {
//     href: 'http://bing.com',
//     target: '_blank',
//   },
//   width: 318,
//   height: 196,
// },
//   ],
// };

type DocumentCardProps = IDocumentCardProps &
  IDocumentCardPreviewProps &
  IDocumentCardLocationProps & { label: string; children: React.ReactNode[] }

function DocumentCard(props: DocumentCardProps): JSX.Element | null {
  return (
    <DocumentCardUI aria-label={props.label}>
      <DocumentCardPreview
        getOverflowDocumentCountText={(overflowCount: number) => `+${overflowCount} more`}
        previewImages={props.previewImages}
      />
      <DocumentCardLocation location={props.location} locationHref={props.locationHref} />
    </DocumentCardUI>
  )
}

export default DocumentCard
