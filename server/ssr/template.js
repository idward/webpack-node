const template = (content, assets, initialState) => {
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
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
    </html>
    `;
};

export default template;
