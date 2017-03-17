// @flow

export const templateString: string = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:200,200i,300,300i,400,600,700" rel="stylesheet">

  </head>
  <body>
    <div id="app" />
    <script type="text/javascript" src="{{BUNDLE_URL}}"></script>
  </body>
</html>`;
