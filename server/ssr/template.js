const template = (content, assets) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        ${assets.styles}
      </head>
      <body>
        <div id="app">${content}</div>
      </body>
      ${assets.js}
    </html>
    `;
};

export default template;
