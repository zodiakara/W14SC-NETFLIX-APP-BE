import PdfPrinter from "pdfmake";
import { join } from "path";

export const getPDFReadableStream = (media) => {
  // define font files:
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica",
    },
  };

  const printer = new PdfPrinter(fonts);
  // const postUrl = join("./public/img/medias/", `${media.poster}.jpg`);

  const docDefinition = {
    content: [
      {
        text: `${media.title} \n\n`,
        style: "header",
      },
      // {
      //   image: postUrl,
      //   fit: [250, 200],
      //   alignment: "center",
      // },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
      },
      normalText: {
        fontSize: 12,
        bold: false,
        alignment: "center",
      },
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();

  return pdfReadableStream;
};
