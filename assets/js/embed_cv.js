var hostname = location.hostname;
const keys = {
    "localhost": "a7097fbcc1c746559e9025da3105dfd6",
    "mike-pc.local": "fa7a15b9db904e5dac00d42d954cc7b2",
    "mike84265.github.io": "3ac483a804fa4af4bf4b63a7f4555214",
};

document.addEventListener("adobe_dc_view_sdk.ready", function(){
  var adobeDCView = new AdobeDC.View({clientId: keys[hostname], divId: "adobe-dc-view"});
  adobeDCView.previewFile({
    content:{ location: { url: "/files/mike_tsai_cv.pdf"}},
    metaData:{fileName: "mike_tsai_cv.pdf"}
  },
  {
    embedMode: "IN_LINE",
    showPrintPDF: true,
  });
})
