import { Global } from '@emotion/react'

export default function Fonts(): JSX.Element {
  return (
    <Global
      styles={`
        @font-face {
          font-family: "BwModelica";
          src: url('/fonts/BwModelica-Regular.woff');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "BwModelica";
          src: url('/fonts/BwModelica-Medium.woff');
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: "BwModelica";
          src: url('/fonts/BwModelica-Bold.woff');
          font-weight: bold;
          font-style: normal;
        }

        @font-face {
          font-family: "BwModelica";
          src: url('/fonts/BwModelica-ExtraBold.woff');
          font-weight: 800;
          font-style: normal;
        }
      `}
    />
  )
}
