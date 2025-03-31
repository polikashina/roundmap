import { jsPDF } from "jspdf";

export const downloadChart = (svg: SVGSVGElement | null) => {
  if (!svg) throw new Error("svg is null");

  const { width, height } = svg.viewBox.baseVal;
  const outerHTML = svg.outerHTML;

  const blob = new Blob([outerHTML], { type: "image/svg+xml" });

  const URL = window.URL || window.webkitURL || window;
  const blobURL = URL.createObjectURL(blob);

  convertSVGtoJPEG(blobURL, width, height, (jpeg: string) => {
    const doc = new jsPDF({ unit: "px", format: "a4" });

    const date = new Intl.DateTimeFormat("en").format(new Date());
    doc.text(`Balance wheel ${date}`, 30, 40);
    doc.addImage(jpeg, "JPEG", 30, 100, width / 2, height / 2);
    doc.save(`balance-wheel-${date}.pdf`);
  });
};

const convertSVGtoJPEG = (
  blobURL: string,
  width: number,
  height: number,
  cb: (jpeg: string) => void
) => {
  const image = new Image();
  image.src = blobURL;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0, width, height);

    const jpeg = canvas.toDataURL("image/jpg");
    cb(jpeg);
  };
};
