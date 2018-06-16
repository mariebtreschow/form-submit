
const generateDetailsHTML = (details) => {
  let detailsHTML = `</br><ul style="overflow-y:auto;height:3.5rem;margin:0.800rem 0 0 0;
  text-align: start;padding-left:8rem;">`;
    _.each(details, (detail) => {
      detailsHTML += `<li style="font-size:1rem">
      ${detail}</li>`;
    });
  detailsHTML += '</ul>';
  return detailsHTML;
};

const generateMessage = (message, details) => {
  let detailsHTML = '';
  if (details) {
    detailsHTML = generateDetailsHTML(details);
  }
  return `${message}${detailsHTML}`;
};

export default generateMessage;
