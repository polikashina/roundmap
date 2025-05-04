export function createRenderFunction() {
  return function render() {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="yandex-verification" content="1e86330536c8dfb9" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
  </head>
<title>roundMap: Колесо баланса</title>
<body>
    <div id="root"></div>
</body>
</html>
    `.trim();
  };
}
