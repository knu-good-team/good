import { Control } from 'ol/control'

export const createLegendControl = () => {
    const legendElement = document.createElement('div');
    legendElement.className = 'ol-unselectable ol-control';
    legendElement.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 10px;
      padding: 10px;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      font-size: 10px;
      width: 150px;
    `;

    const legendTitle = document.createElement('div');
    legendTitle.style.fontWeight = 'bold';
    legendTitle.style.marginBottom = '5px';
    legendTitle.innerText = '안전등급';
    legendElement.appendChild(legendTitle);

    const legendItems = [
        { color: '#ffffb2', label: '1등급' },
        { color: '#fee88b', label: '2등급' },
        { color: '#fed165', label: '3등급' },
        { color: '#fdb751', label: '4등급' },
        { color: '#fd9b43', label: '5등급' },
        { color: '#fa7a35', label: '6등급' },
        { color: '#f45629', label: '7등급' },
        { color: '#ea3420', label: '8등급' },
        { color: '#d31a23', label: '9등급' },
        { color: '#bd0026', label: '10등급' },
    ];

    const legendGrid = document.createElement('div');
    legendGrid.style.display = 'grid';
    legendGrid.style.gridTemplateColumns = '1fr 1fr';
    legendGrid.style.gap = '5px';

    legendItems.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';

        const legendColor = document.createElement('div');
        legendColor.style.width = '15px';
        legendColor.style.height = '15px';
        legendColor.style.marginRight = '5px';
        legendColor.style.backgroundColor = item.color;
        legendColor.style.border = '1px solid #000';

        const legendLabel = document.createElement('div');
        legendLabel.innerText = item.label;

        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendLabel);
        legendGrid.appendChild(legendItem);
    });

    legendElement.appendChild(legendGrid);

    return new Control({ element: legendElement });
};